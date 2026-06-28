import { PageHeading } from "@/components/shell/dashboard-shell";
import { InviteStaffForm } from "@/components/school/invite-staff-form";
import { ProgressBar } from "@/components/brand/progress-bar";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/user";
import {
  getSchool,
  getSponsoredTeachers,
  getStaffInvitationsForSchool,
  getEnrolmentsForTeacher,
  getCourse,
} from "@/lib/data/queries";

export default async function SchoolStaffPage() {
  const profile = await requireRole("school");
  const school = getSchool(profile.id);
  const staff = getSponsoredTeachers(profile.id);
  const invitations = getStaffInvitationsForSchool(profile.id);

  return (
    <>
      <PageHeading
        title="Staff training"
        description="Invite your existing staff and sponsor them into IBvy courses. They train and certify on the same rail as everyone else."
      />

      {school?.schoolType !== "transforming" && (
        <div className="mb-6 rounded-lg border border-brass/30 bg-brass-tint px-4 py-3 text-sm text-brass">
          Staff training is designed for schools transforming to IB. Switch to a
          transforming school from the demo selector to see a populated cohort.
        </div>
      )}

      {/* Invite */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
            Invite a staff member
          </h2>
          <InviteStaffForm />
        </CardContent>
      </Card>

      {/* Cohort */}
      <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
        Your cohort
      </h2>
      {staff.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-paper-raised p-6 text-sm text-muted-foreground">
          No staff in training yet. Invite a staff member above to begin.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-sm">
            <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Staff member</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Progress</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {staff.map((t) => {
                const enrol = getEnrolmentsForTeacher(t.id).find(
                  (e) => e.sponsoredBySchoolId === profile.id,
                );
                const course = enrol ? getCourse(enrol.courseId) : undefined;
                return (
                  <tr key={t.id} className="bg-paper-raised">
                    <td className="px-4 py-3 font-medium text-ink">
                      {t.fullName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {course?.title ?? "Not enrolled"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-40">
                        <ProgressBar value={enrol?.progressPct ?? 0} showLabel />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={t.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pending invitations */}
      {invitations.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
            Invitations
          </h2>
          <div className="grid gap-3">
            {invitations.map((inv) => (
              <Card key={inv.id}>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {inv.teacherName ?? inv.teacherEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {inv.teacherEmail}
                    </p>
                  </div>
                  <StatusPill status={inv.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
