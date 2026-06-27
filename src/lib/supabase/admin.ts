import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS. SERVER-SIDE ONLY: used for
 * privileged operations (assessment scoring, certificate issuance, placement
 * creation, lead reads). Never import this into a Client Component. The
 * `server-only` import makes a client-side import a build-time error.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
