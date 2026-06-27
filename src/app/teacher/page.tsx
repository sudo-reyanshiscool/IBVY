import Link from "next/link";
import { BookOpen, Award, Briefcase, ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { StatCard } from "@/components/brand/stat-card";
import { ProgressBar } from "@/components/brand/progress-bar";
import { MatchChip } from "@/components/brand/match-chip";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import {
  getTeacher,
  getEnrolmentsForTeacher,
  getCertificationsForTeacher,
  getApplicationsForTeacher,
  getOpenVacancies,
  getCourse,
  getSchool,
  matchTeacherToVacancy,
} from "@/lib/data/queries";

export default async function TeacherDashboard() {
  const profile = await requireRole("teacher");
  const teacher = getTeacher(profile.id);

  const enrolments = getEnrolmentsForTeacher(profile.id);
  const certs = getCertificationsForTeacher(profile.id);
  const applications = getApplicationsForTeacher(profile.id);

  // Recommend open vacancies matched to the teacher's subjects.
  const recommended = teacher
    ? getOpenVacancies()
        .map((v) => ({ vacancy: v, match: matchTeacherToVacancy(teacher, v) }))
        .sort((a, b) => b.match.score - a.match.score)
        .slice(0, 3)
    : [];

  return (
    <>
      <PageHeading
        title={`Welcome, ${teacher?.fullName.split(" ")[0] ?? "teacher"}`}
        description="Your training, certifications, and vacancies matched to your subjects."
        action={<StatusPill status={teacher?.status ?? "training"} />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Courses"
          value={enrolments.length}
          icon={BookOpen}
          hint={`${enrolments.filter((e) => e.status === "completed").length} completed`}
        />
        <StatCard label="Certifications" value={certs.length} icon={Award} />
        <StatCard
          label="Applications"
          value={applications.length}
          icon={Briefcase}
        />
      </div>

      {/* Continue learning */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Continue learning
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/teacher/courses">
              All courses <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        {enrolments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              You have not enrolled in a course yet.{" "}
              <Link href="/teacher/courses" className="text-ivy underline">
                Browse the catalogue
              </Link>
              .
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {enrolments.map((e) => {
              const course = getCourse(e.courseId);
              if (!course) return null;
              return (
                <Card key={e.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif font-semibold text-ink">
                          {course.title}
                        </h3>
                        <p className="text-sm text-brass">{course.subject}</p>
                      </div>
                      <StatusPill status={e.status} />
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={e.progressPct} showLabel />
                    </div>
                    <Button asChild size="sm" className="mt-4">
                      <Link href={`/teacher/courses/${course.id}`}>
                        {e.status === "completed" ? "Review" : "Continue"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended vacancies */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Recommended vacancies
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/teacher/jobs">
              All jobs <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {recommended.map(({ vacancy, match }) => {
            const school = getSchool(vacancy.schoolId);
            return (
              <Card key={vacancy.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-ink">{vacancy.title}</h3>
                      <MatchChip match={match} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {school?.schoolName} {vacancy.location && `· ${vacancy.location}`}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/teacher/jobs/${vacancy.id}`}>View role</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
