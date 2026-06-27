import { PageHeading } from "@/components/shell/dashboard-shell";
import {
  AdminLeadsTable,
  type AdminLeadRow,
} from "@/components/admin/admin-leads-table";
import { ComingSoon } from "@/components/shell/coming-soon";
import { requireRole } from "@/lib/auth/user";
import { getPilotLeads } from "@/lib/data/queries";

export default async function AdminLeadsPage() {
  await requireRole("admin");
  const leads: AdminLeadRow[] = getPilotLeads().map((l) => ({
    id: l.id,
    schoolName: l.schoolName,
    contactName: l.contactName,
    email: l.email,
    city: l.city,
    type: l.schoolType,
    message: l.message,
    status: l.status,
    createdAt: l.createdAt,
  }));

  return (
    <>
      <PageHeading
        title="Pilot leads"
        description="Schools that requested a pilot through the marketing pages."
      />
      {leads.length === 0 ? (
        <ComingSoon phase="No leads yet">
          Submissions from the request-a-pilot forms appear here.
        </ComingSoon>
      ) : (
        <AdminLeadsTable leads={leads} />
      )}
    </>
  );
}
