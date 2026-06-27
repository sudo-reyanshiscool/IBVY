"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema, loginSchema } from "@/lib/auth/schemas";
import { dashboardPathForRole } from "@/lib/auth/user";
import type { Role } from "@/lib/nav";

export type AuthState = { error?: string; message?: string };

/**
 * Sign up a teacher or school. The role and name are passed as auth metadata;
 * the handle_new_user() database trigger creates the matching profiles row
 * (server-side, security definer). On an active session the user is routed
 * straight to their dashboard; otherwise we ask them to confirm their email.
 */
export async function signUpAction(
  formData: FormData,
): Promise<AuthState> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const { fullName, email, password, role } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Email confirmation off: a session exists immediately, go to the dashboard.
  if (data.session) {
    redirect(dashboardPathForRole(role as Role));
  }

  // Email confirmation on: no session yet.
  return {
    message:
      "Check your email to confirm your account, then sign in to continue.",
  };
}

/** Sign in and route to the caller's role dashboard. */
export async function signInAction(
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // Deliberately generic, and never red in the UI.
    return { error: "Those details did not match. Please try again." };
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .single();

  redirect(dashboardPathForRole((data?.role as Role) ?? "teacher"));
}

/** Sign out and return to the landing page. */
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
