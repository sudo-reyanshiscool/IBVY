import Link from "next/link";
import { Briefcase, Users, BadgeCheck, GraduationCap, ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { StatCard } from "@/components/brand/stat-card";
import { ProgressBar } from "@/components/brand/progress-bar";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import {
  getSchool,
  getVacanciesForSchool,
  getApplicationsForSchool,
  getPlacementsForSchool,
  getSponsoredTeachers,
  getEnrolmentsForTeacher,
  getCourse,
  formatINR,
} from "@/lib/data/queries";

export default async function SchoolDashboard() {
  const profile = await requireRole("school");
  const school = getSchool(profile.id);
  const transforming = school?.schoolType === "transforming";

  const vacancies = getVacanciesForSchool(profile.id);
  const applications = getApplicationsForSchool(profile.id);
  const placements = getPlacementsForSchool(profile.id);
  const staff = getSponsoredTeachers(profile.id);

  const Hiring = (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Active vacancies
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/school/vacancies">
            All vacancies <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {vacancies.filter((v) => v.status === "open").map((v) => {
          const apps = applications.filter((a) => a.vacancyId === v.id);
          return (
            <Card key={v.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <Link
                    href={`/school/vacancies/${v.id}`}
                    className="font-medium text-ink hover:text-ivy"
                  >
                    {v.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {apps.length} applicant{apps.length === 1 ? "" : "s"}
                  </p>
                </div>
                <StatusPill status={v.status} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );

  const Staff = (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Staff in training
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/school/staff">
            Manage staff <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {staff.map((t) => {
          const enrol = getEnrolmentsForTeacher(t.id)[0];
          const course = enrol ? getCourse(enrol.courseId) : undefined;
          return (
            <Card key={t.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{t.fullName}</p>
                    <p className="text-sm text-brass">{course?.title}</p>
                  </div>
                  <StatusPill status={t.status} />
                </div>
                {enrol && (
                  <div className="mt-3">
                    <ProgressBar value={enrol.progressPct} showLabel />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      <PageHeading
        title={school?.schoolName ?? "Your school"}
        description={
          transforming
            ? "Upskill your existing staff towards IB-readiness, on the IBvy training rail."
            : "Hire pre-vetted, board-certified teachers and track your placements."
        }
        action={
          <Badge variant={school?.verified ? "brass" : "outline"}>
            {school?.verified ? "Verified" : "Awaiting verification"}
          </Badge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open vacancies" value={vacancies.filter((v) => v.status === "open").length} icon={Briefcase} />
        <StatCard label="Applicants" value={applications.length} icon={Users} />
        <StatCard label="Placements" value={placements.length} icon={BadgeCheck} />
        <StatCard label="Staff in training" value={staff.length} icon={GraduationCap} />
      </div>

      {/* Order the two columns by school type. */}
      {transforming ? (
        <>
          {Staff}
          {vacancies.length > 0 && Hiring}
        </>
      ) : (
        <>
          {Hiring}
          {placements.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
                Recent placements
              </h2>
              <div className="grid gap-4">
                {placements.map((p) => (
                  <Card key={p.id}>
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                      <p className="text-sm text-ink">
                        Placement fee {formatINR(p.placementFee)}
                      </p>
                      <StatusPill status={p.feeStatus} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
