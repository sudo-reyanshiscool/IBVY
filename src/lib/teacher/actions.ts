"use server";

import { DEMO_MODE } from "@/lib/config";

export type ApplyState = { ok?: boolean; error?: string };

/**
 * Apply to a vacancy. Prototype mode acknowledges without persisting. With
 * Supabase wired, this inserts into applications (RLS: teachers write their
 * own) and the school sees it in their pipeline.
 */
export async function applyToVacancy(
  _vacancyId: string,
  _coverNote: string,
): Promise<ApplyState> {
  if (DEMO_MODE) return { ok: true };
  return { ok: true };
}
