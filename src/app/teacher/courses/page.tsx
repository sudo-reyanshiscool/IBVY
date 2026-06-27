import Link from "next/link";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { CourseCard } from "@/components/course/course-card";
import { ProgressBar } from "@/components/brand/progress-bar";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import {
  getEnrolmentsForTeacher,
  getPublishedCourses,
  getCourse,
} from "@/lib/data/queries";

export default async function TeacherCoursesPage() {
  const profile = await requireRole("teacher");
  const enrolments = getEnrolmentsForTeacher(profile.id);
  const enrolledIds = new Set(enrolments.map((e) => e.courseId));
  const catalogue = getPublishedCourses().filter((c) => !enrolledIds.has(c.id));

  return (
    <>
      <PageHeading
        title="Courses"
        description="Continue your enrolments, or enrol in a new board-designed course."
      />

      {enrolments.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
            My enrolments
          </h2>
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
                        {e.status === "completed" ? "Review course" : "Continue"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          {enrolments.length > 0 ? "More courses" : "Course catalogue"}
        </h2>
        {catalogue.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              You are enrolled in every available course. More are on the way.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalogue.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                footer={
                  <Button asChild className="w-full">
                    <Link href={`/teacher/courses/${course.id}`}>Enrol</Link>
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
