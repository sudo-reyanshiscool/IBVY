import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next 16 renamed the `middleware` file convention to `proxy`. This runs on
 * every matched request to keep the Supabase session fresh. Role-aware route
 * protection for /teacher, /school, /admin is added here in phase 2.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Run on all paths except static assets and image optimisation, so auth
  // cookies refresh without blocking CSS, JS, or images.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
