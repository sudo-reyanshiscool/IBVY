import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/nav";

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
}

/** Where each role lands after sign-in. */
export function dashboardPathForRole(role: Role): string {
  return `/${role}`;
}

/**
 * Fetch the authenticated user and their profile (role, name). Returns null
 * when signed out. Used by role layouts to gate access and label the shell.
 */
export async function getSessionProfile(): Promise<{
  userId: string;
  email: string | undefined;
  profile: Profile | null;
} | null> {
  const supabase = await createClient();

  // getUser can throw if Supabase is unreachable (e.g. placeholder scaffold);
  // treat any failure as signed-out so pages degrade rather than crash.
  let user;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    return null;
  }

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .single();

  return {
    userId: user.id,
    email: user.email,
    profile: (profile as Profile) ?? null,
  };
}

/**
 * Gate a role route group. Redirects signed-out users to /login and
 * wrong-role users to their own dashboard. Returns the caller's profile.
 * Backs the proxy-level guard with a server-component check.
 */
export async function requireRole(role: Role): Promise<Profile> {
  const session = await getSessionProfile();
  if (!session || !session.profile) redirect("/login");
  if (session.profile.role !== role) {
    redirect(dashboardPathForRole(session.profile.role));
  }
  return session.profile;
}
