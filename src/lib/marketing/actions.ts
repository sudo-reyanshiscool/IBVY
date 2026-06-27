"use server";

import { pilotLeadSchema } from "@/lib/marketing/pilot";
import { DEMO_MODE } from "@/lib/config";

export type PilotState = { ok?: boolean; error?: string };

/**
 * Receive a request-a-pilot submission. In prototype mode there is no backend,
 * so we validate and acknowledge. With Supabase wired, this inserts into
 * pilot_leads (anyone may insert; only admin may read, per the RLS plan).
 */
export async function submitPilotLead(
  formData: FormData,
): Promise<PilotState> {
  const parsed = pilotLeadSchema.safeParse({
    schoolName: formData.get("schoolName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    city: formData.get("city") || undefined,
    schoolType: formData.get("schoolType") || undefined,
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  if (DEMO_MODE) {
    // Prototype: acknowledge without persisting. Seeded leads appear in
    // /admin/leads so the flow is still demonstrable end to end.
    return { ok: true };
  }

  // Real backend: insert into pilot_leads here when Supabase is wired.
  return { ok: true };
}
