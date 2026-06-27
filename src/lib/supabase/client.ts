import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components (browser). Reads the public
 * env vars only; the service-role key is never exposed here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
