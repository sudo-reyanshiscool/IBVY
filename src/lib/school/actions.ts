"use server";

import { DEMO_MODE } from "@/lib/config";

export type SchoolActionState = { ok?: boolean; error?: string };

/**
 * Invite a teacher to apply. Prototype mode acknowledges; with Supabase wired
 * this creates an application flagged invited_by_school.
 */
export async function inviteTeacher(
  _teacherId: string,
): Promise<SchoolActionState> {
  if (DEMO_MODE) return { ok: true };
  return { ok: true };
}

/** Invite a member of existing staff (market one). Prototype acknowledges. */
export async function inviteStaff(
  _email: string,
  _name: string,
): Promise<SchoolActionState> {
  if (DEMO_MODE) return { ok: true };
  return { ok: true };
}
