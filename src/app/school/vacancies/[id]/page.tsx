import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { PipelineBoard, type Applicant } from "@/components/school/pipeline-board";
import { StatusPill } from "@/components/brand/status-pill";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import {
  getVacancy,
  getApplicationsForVacancy,
  getTeacher,
  matchTeacherToVacancy,
} from "@/lib/data/queries";
import { DEMO_PLACEMENT_FEE } from "@/lib/mock/data";

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("school");
  const { id } = await params;
  const vacancy = getVacancy(id);
  if (!vacancy || vacancy.schoolId !== profile.id) notFound();

  const applicants: Applicant[] = getApplicationsForVacancy(id).flatMap((a) => {
    const teacher = getTeacher(a.teacherId);
    if (!teacher) return [];
    const match = matchTeacherToVacancy(teacher, vacancy);
    return [
      {
        applicationId: a.id,
        teacherName: teacher.fullName,
        subjects: teacher.subjects.join(", "),
        status: a.status as string,
        match: { level: match.level, label: match.label },
      },
    ];
  });

  const feeLabel = new Intl.NumberFormat("en-IN").format(DEMO_PLACEMENT_FEE);

  return (
    <>
      <Link
        href="/school/vacancies"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to vacancies
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl font-semibold text-ink">
              {vacancy.title}
            </h1>
            {vacancy.programme && <Badge variant="secondary">{vacancy.programme}</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{vacancy.subject}</span>
            {vacancy.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" /> {vacancy.location}
              </span>
            )}
          </div>
        </div>
        <StatusPill status={vacancy.status} />
      </div>

      <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
        Applicant pipeline
      </h2>
      {applicants.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-paper-raised p-6 text-sm text-muted-foreground">
          No applicants yet. Invite teachers from the{" "}
          <Link href="/school/talent" className="text-ivy underline">
            talent pool
          </Link>
          .
        </p>
      ) : (
        <PipelineBoard applicants={applicants} feeLabel={feeLabel} />
      )}
    </>
  );
}
