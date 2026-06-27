import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Role } from "@/lib/nav";

const ROLE_PREFIXES: Record<string, Role> = {
  "/teacher": "teacher",
  "/school": "school",
  "/admin": "admin",
};

const AUTH_PAGES = ["/login", "/signup"];

function matchedPrefix(pathname: string): Role | null {
  for (const [prefix, role] of Object.entries(ROLE_PREFIXES)) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return role;
  }
  return null;
}

/**
 * Refreshes the Supabase auth session and enforces role-aware route access,
 * called from proxy.ts (Next 16 renamed middleware to proxy):
 *   - signed-out users hitting /teacher, /school or /admin go to /login
 *   - signed-in users on the wrong group are sent to their own dashboard
 *   - signed-in users hitting /login or /signup are sent to their dashboard
 *
 * If the Supabase env vars are not configured yet (placeholder scaffold) this
 * is a no-op so the app still runs locally.
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey || url.includes("placeholder")) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not run code between client creation and getUser (Supabase guidance).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const required = matchedPrefix(pathname);

  // Helper: redirect while preserving the refreshed auth cookies.
  const redirectTo = (path: string) => {
    const target = request.nextUrl.clone();
    target.pathname = path;
    target.search = "";
    const redirect = NextResponse.redirect(target);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  if (!user) {
    if (required) return redirectTo("/login");
    return response;
  }

  // Signed in: resolve role to enforce the correct group.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = (profile?.role as Role) ?? "teacher";

  if (required && required !== role) {
    return redirectTo(`/${role}`);
  }

  if (AUTH_PAGES.includes(pathname)) {
    return redirectTo(`/${role}`);
  }

  return response;
}
