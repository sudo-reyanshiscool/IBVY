import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AssessmentQuiz } from "@/components/course/assessment-quiz";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { requireRole } from "@/lib/auth/user";
import { getCourse, getCertificationsForTeacher } from "@/lib/data/queries";

/** Deterministic demo certificate number, stable for a teacher+course pair. */
function demoCertNumber(teacherId: string, courseId: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seed = `${teacherId}:${courseId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[hash % chars.length];
    hash = Math.floor(hash / chars.length) + (i + 1) * 7;
  }
  return `IBVY-2026-${suffix}`;
}

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("teacher");
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const existing = getCertificationsForTeacher(profile.id).find(
    (c) => c.courseId === id,
  );
  const certificateNumber =
    existing?.certificateNumber ?? demoCertNumber(profile.id, id);

  return (
    <>
      <Link
        href={`/teacher/courses/${id}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to course
      </Link>
      <PageHeading
        title={course.assessment.title}
        description={`Answer all questions. The pass mark is ${course.assessment.passingScore}%. Passing issues your certificate automatically.`}
      />
      <AssessmentQuiz course={course} certificateNumber={certificateNumber} />
    </>
  );
}
