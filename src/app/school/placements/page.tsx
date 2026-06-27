import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";
import { StatusPill } from "@/components/brand/status-pill";
import { StatCard } from "@/components/brand/stat-card";
import { BadgeCheck, IndianRupee } from "lucide-react";
import { requireRole } from "@/lib/auth/user";
import {
  getPlacementsForSchool,
  getTeacher,
  getVacancy,
  formatINR,
} from "@/lib/data/queries";

export default async function SchoolPlacementsPage() {
  const profile = await requireRole("school");
  const placements = getPlacementsForSchool(profile.id);
  const totalPaid = placements
    .filter((p) => p.feeStatus === "paid")
    .reduce((s, p) => s + p.placementFee, 0);

  return (
    <>
      <PageHeading
        title="Placements"
        description="Every hire made through IBvy, with its placement fee and status."
      />

      {placements.length === 0 ? (
        <ComingSoon phase="No placements yet">
          When you move a candidate to hired on a vacancy pipeline, the placement
          and its fee appear here.
        </ComingSoon>
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <StatCard
              label="Placements"
              value={placements.length}
              icon={BadgeCheck}
            />
            <StatCard
              label="Fees paid"
              value={formatINR(totalPaid)}
              icon={IndianRupee}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Teacher</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Fee</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {placements.map((p) => {
                  const teacher = getTeacher(p.teacherId);
                  const vacancy = getVacancy(p.vacancyId);
                  return (
                    <tr key={p.id} className="bg-paper-raised">
                      <td className="px-4 py-3 font-medium text-ink">
                        {teacher?.fullName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {vacancy?.title}
                      </td>
                      <td className="px-4 py-3 text-ink">
                        {formatINR(p.placementFee)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={p.feeStatus} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.placedAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
