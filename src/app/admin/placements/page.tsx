import { PageHeading } from "@/components/shell/dashboard-shell";
import {
  AdminPlacementsTable,
  type AdminPlacementRow,
} from "@/components/admin/admin-placements-table";
import { ComingSoon } from "@/components/shell/coming-soon";
import { requireRole } from "@/lib/auth/user";
import {
  getPlacements,
  getTeacher,
  getSchool,
  formatINR,
} from "@/lib/data/queries";

export default async function AdminPlacementsPage() {
  await requireRole("admin");
  const placements: AdminPlacementRow[] = getPlacements().map((p) => ({
    id: p.id,
    teacherName: getTeacher(p.teacherId)?.fullName ?? "Teacher",
    schoolName: getSchool(p.schoolId)?.schoolName ?? "School",
    fee: formatINR(p.placementFee),
    feeStatus: p.feeStatus,
  }));

  return (
    <>
      <PageHeading
        title="Placements"
        description="Oversee all placements and update each fee as it is invoiced and paid."
      />
      {placements.length === 0 ? (
        <ComingSoon phase="No placements yet">
          Placements appear here as schools hire from the certified pool.
        </ComingSoon>
      ) : (
        <AdminPlacementsTable placements={placements} />
      )}
    </>
  );
}
