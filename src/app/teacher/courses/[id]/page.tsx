import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CoursePlayer } from "@/components/course/course-player";
import { requireRole } from "@/lib/auth/user";
import { getCourse, getEnrolment } from "@/lib/data/queries";

export default async function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("teacher");
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const enrolment = getEnrolment(profile.id, id);

  return (
    <>
      <Link
        href="/teacher/courses"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to courses
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-ink">
        {course.title}
      </h1>
      <CoursePlayer
        course={course}
        initialCompleted={enrolment?.completedLessonIds ?? []}
      />
    </>
  );
}
