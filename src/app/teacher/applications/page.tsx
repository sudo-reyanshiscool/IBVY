import Link from "next/link";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/user";
import {
  getApplicationsForTeacher,
  getVacancy,
  getSchool,
} from "@/lib/data/queries";

const STAGES = ["applied", "shortlisted", "interview", "offered", "hired"];

export default async function TeacherApplicationsPage() {
  const profile = await requireRole("teacher");
  const apps = getApplicationsForTeacher(profile.id);

  return (
    <>
      <PageHeading
        title="Applications"
        description="Track every application across the hiring pipeline."
      />

      {apps.length === 0 ? (
        <ComingSoon phase="No applications yet">
          When you apply to a vacancy, or a school invites you, it will appear
          here with its current status.
        </ComingSoon>
      ) : (
        <div className="grid gap-4">
          {apps.map((app) => {
            const vacancy = getVacancy(app.vacancyId);
            const school = vacancy ? getSchool(vacancy.schoolId) : undefined;
            const currentIndex = STAGES.indexOf(app.status);
            return (
              <Card key={app.id}>
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/teacher/jobs/${app.vacancyId}`}
                        className="font-serif font-semibold text-ink hover:text-ivy"
                      >
                        {vacancy?.title}
                      </Link>
                      <p className="text-sm text-brass">{school?.schoolName}</p>
                      {app.invitedBySchool && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Invited by the school
                        </p>
                      )}
                    </div>
                    <StatusPill status={app.status} />
                  </div>

                  {/* Pipeline indicator */}
                  {currentIndex >= 0 && (
                    <div className="mt-5 flex items-center gap-1.5">
                      {STAGES.map((stage, i) => (
                        <div key={stage} className="flex flex-1 flex-col gap-1">
                          <div
                            className={
                              "h-1.5 rounded-full " +
                              (i <= currentIndex ? "bg-ivy" : "bg-sage-soft")
                            }
                          />
                          <span className="text-[10px] capitalize text-muted-foreground">
                            {stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
