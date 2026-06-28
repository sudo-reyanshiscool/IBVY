import { Clock, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/types";

/** Editorial course card used in the public catalogue and teacher views. */
export function CourseCard({
  course,
  footer,
}: {
  course: Course;
  footer?: React.ReactNode;
}) {
  const lessonCount = course.modules.reduce(
    (n, m) => n + m.lessons.length,
    0,
  );
  return (
    <Card className="hover-lift group flex h-full flex-col hover:border-brass/40">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          {course.programme && (
            <Badge variant="secondary">{course.programme}</Badge>
          )}
          <Badge variant="outline" className="capitalize">
            {course.level}
          </Badge>
        </div>
        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-ivy">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-brass">{course.subject}</p>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">
          {course.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Layers className="size-3.5" aria-hidden /> {lessonCount} lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden /> {course.durationHours} hours
          </span>
        </div>
        {footer && <div className="mt-5">{footer}</div>}
      </CardContent>
    </Card>
  );
}
