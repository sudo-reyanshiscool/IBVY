/**
 * Whether a real Supabase backend is wired up. When false, the app runs in
 * demo mode: it serves rich mock data and lets you browse every role without
 * signing in, so the prototype is fully demoable with no backend. All real
 * Supabase code paths stay in place behind this flag (a clean seam) and switch
 * on automatically once the env vars are set.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("placeholder"));
}

/** Convenience inverse: true when running the no-backend prototype. */
export const DEMO_MODE = !isSupabaseConfigured();
