import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { dashboardPathForRole } from "@/lib/auth/user";
import type { Role } from "@/lib/nav";

/**
 * Handles the email confirmation link from Supabase Auth. Verifies the OTP,
 * which establishes a session, then routes the user to their role dashboard.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let dest = "/";
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        dest = dashboardPathForRole((profile?.role as Role) ?? "teacher");
      }
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  // Verification failed or link malformed: send back to sign in.
  return NextResponse.redirect(`${origin}/login`);
}
