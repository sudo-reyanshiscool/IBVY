import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, IndianRupee } from "lucide-react";
import { ApplyForm } from "@/components/jobs/apply-form";
import { MatchChip } from "@/components/brand/match-chip";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import {
  getVacancy,
  getSchool,
  getTeacher,
  matchTeacherToVacancy,
  getApplicationsForTeacher,
} from "@/lib/data/queries";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("teacher");
  const { id } = await params;
  const vacancy = getVacancy(id);
  if (!vacancy) notFound();

  const school = getSchool(vacancy.schoolId);
  const teacher = getTeacher(profile.id);
  const match = teacher ? matchTeacherToVacancy(teacher, vacancy) : null;
  const existing = getApplicationsForTeacher(profile.id).find(
    (a) => a.vacancyId === id,
  );

  return (
    <>
      <Link
        href="/teacher/jobs"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to jobs
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-3xl font-semibold text-ink">
              {vacancy.title}
            </h1>
            {match && <MatchChip match={match} />}
          </div>
          <p className="mt-2 text-brass">{school?.schoolName}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {vacancy.programme && <Badge variant="secondary">{vacancy.programme}</Badge>}
            <span>{vacancy.subject}</span>
            {vacancy.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" /> {vacancy.location}
              </span>
            )}
            {vacancy.salaryRange && (
              <span className="inline-flex items-center gap-1">
                <IndianRupee className="size-4" /> {vacancy.salaryRange}
              </span>
            )}
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-serif text-lg font-semibold text-ink">
                About the role
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
                {vacancy.description}
              </p>
            </div>
            {vacancy.requirements && (
              <div>
                <h2 className="font-serif text-lg font-semibold text-ink">
                  Requirements
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
                  {vacancy.requirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Apply panel */}
        <aside>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="font-serif text-lg font-semibold text-ink">
                {existing ? "Your application" : "Apply for this role"}
              </h2>
              <div className="mt-4">
                {existing ? (
                  <div className="space-y-3">
                    <StatusPill status={existing.status} />
                    <p className="text-sm text-muted-foreground">
                      You applied on {existing.appliedAt}. Track progress in your
                      applications.
                    </p>
                    <Link
                      href="/teacher/applications"
                      className="text-sm font-medium text-ivy hover:underline"
                    >
                      View applications
                    </Link>
                  </div>
                ) : (
                  <ApplyForm vacancyId={vacancy.id} />
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}
