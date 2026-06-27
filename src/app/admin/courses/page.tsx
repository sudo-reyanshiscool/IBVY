import { Plus, Layers, FileText } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { ToggleControl } from "@/components/admin/toggle-control";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import { getCourses } from "@/lib/data/queries";

export default async function AdminCoursesPage() {
  await requireRole("admin");
  const courses = getCourses();

  return (
    <>
      <PageHeading
        title="Courses"
        description="The board's curriculum. Author courses, modules, lessons, and one assessment per course, then publish."
        action={
          <Button>
            <Plus className="size-4" /> New course
          </Button>
        }
      />

      <div className="grid gap-5">
        {courses.map((course) => {
          const lessons = course.modules.reduce(
            (n, m) => n + m.lessons.length,
            0,
          );
          return (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-lg font-semibold text-ink">
                        {course.title}
                      </h2>
                      {course.programme && (
                        <Badge variant="secondary">{course.programme}</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-brass">{course.subject}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Layers className="size-3.5" /> {course.modules.length}{" "}
                        modules
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FileText className="size-3.5" /> {lessons} lessons
                      </span>
                      <span>
                        {course.assessment.questions.length}-question assessment
                      </span>
                    </div>
                  </div>
                  <ToggleControl
                    initial={course.published}
                    onLabel="Publish"
                    offLabel="Unpublish"
                    onBadge="Published"
                    offBadge="Draft"
                  />
                </div>

                <div className="mt-5 grid gap-2 border-t border-line pt-4">
                  {course.modules.map((m, mi) => (
                    <div key={m.id} className="text-sm">
                      <span className="font-medium text-ink">
                        Module {mi + 1}: {m.title}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        · {m.lessons.length} lessons
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
