import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/brand/reveal";
import { getPublishedCourses } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "The IBvy course catalogue, designed by the educator board across IB programmes and subjects.",
};

export default function CoursesPage() {
  const courses = getPublishedCourses();
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink">
          The course catalogue
        </h1>
        <p className="mt-3 text-muted-foreground">
          Board-designed courses across IB programmes and subjects. Sign in to
          enrol and work through the lessons and assessment.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <Reveal key={course.id} delay={(i % 3) * 100}>
            <CourseCard
              course={course}
              footer={
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signup">Sign in to enrol</Link>
                </Button>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
