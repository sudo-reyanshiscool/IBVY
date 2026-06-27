import { PageHeading } from "@/components/shell/dashboard-shell";
import {
  AdminSchoolsTable,
  type AdminSchoolRow,
} from "@/components/admin/admin-schools-table";
import { requireRole } from "@/lib/auth/user";
import { getSchools } from "@/lib/data/queries";

export default async function AdminSchoolsPage() {
  await requireRole("admin");
  const schools: AdminSchoolRow[] = getSchools().map((s) => ({
    id: s.id,
    name: s.schoolName,
    type: s.schoolType,
    city: s.city,
    verified: s.verified,
  }));

  return (
    <>
      <PageHeading
        title="Schools"
        description="Verify schools. Verification is the trust badge shown to teachers."
      />
      <AdminSchoolsTable schools={schools} />
    </>
  );
}
