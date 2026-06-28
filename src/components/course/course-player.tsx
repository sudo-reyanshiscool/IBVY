"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react";
import { Markdown } from "@/components/course/markdown";
import { ProgressBar } from "@/components/brand/progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

/**
 * Interactive course player. Lesson completion is tracked in local state for
 * the prototype (live progress, resets on reload). With Supabase wired this
 * persists to lesson_progress and recomputes the enrolment.
 */
export function CoursePlayer({
  course,
  initialCompleted,
}: {
  course: Course;
  initialCompleted: string[];
}) {
  const allLessons = useMemo(
    () => course.modules.flatMap((m) => m.lessons),
    [course],
  );
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(initialCompleted),
  );
  const [activeId, setActiveId] = useState<string>(
    allLessons.find((l) => !initialCompleted.includes(l.id))?.id ??
      allLessons[0]?.id,
  );

  const active = allLessons.find((l) => l.id === activeId);
  const pct = Math.round((completed.size / allLessons.length) * 100);
  const allDone = completed.size === allLessons.length;

  const markComplete = (id: string) => {
    setCompleted((prev) => new Set(prev).add(id));
    const idx = allLessons.findIndex((l) => l.id === id);
    const next = allLessons[idx + 1];
    if (next) setActiveId(next.id);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Lesson list */}
      <aside className="space-y-5">
        <Card>
          <CardContent className="p-4">
            <ProgressBar value={pct} showLabel />
            <p className="mt-2 text-xs text-muted-foreground">
              {completed.size} of {allLessons.length} lessons complete
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {course.modules.map((m, mi) => (
            <div key={m.id}>
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-brass">
                Module {mi + 1}: {m.title}
              </p>
              <ul className="space-y-1">
                {m.lessons.map((l) => {
                  const done = completed.has(l.id);
                  const isActive = l.id === activeId;
                  return (
                    <li key={l.id}>
                      <button
                        onClick={() => setActiveId(l.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                          isActive
                            ? "bg-ivy/15 text-ivy-tint"
                            : "text-ink hover:bg-white/5",
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="size-4 shrink-0 text-ivy" />
                        ) : (
                          <Circle className="size-4 shrink-0 text-sage" />
                        )}
                        <span className="flex-1">{l.title}</span>
                        {l.durationMin && (
                          <span className="text-xs text-muted-foreground">
                            {l.durationMin}m
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Lesson content */}
      <div>
        {active && (
          <Card>
            <CardContent className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wide text-brass">
                {course.subject}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">
                {active.title}
              </h2>

              {active.videoUrl && (
                <div className="mt-4 flex items-center gap-2 rounded-md border border-line bg-sage-soft/40 px-4 py-3 text-sm text-muted-foreground">
                  <PlayCircle className="size-4 text-ivy" /> Video lesson
                </div>
              )}

              <div className="mt-5">
                <Markdown content={active.content} />
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                {completed.has(active.id) ? (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-ivy">
                    <CheckCircle2 className="size-4" /> Completed
                  </span>
                ) : (
                  <Button onClick={() => markComplete(active.id)}>
                    Mark lesson complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assessment gate */}
        <Card className="mt-6">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
            <div className="flex items-center gap-3">
              {allDone ? (
                <CheckCircle2 className="size-5 text-ivy" />
              ) : (
                <Lock className="size-5 text-sage" />
              )}
              <div>
                <p className="font-medium text-ink">{course.assessment.title}</p>
                <p className="text-sm text-muted-foreground">
                  {allDone
                    ? "All lessons complete. Take the assessment to certify."
                    : "Complete every lesson to unlock the assessment."}
                </p>
              </div>
            </div>
            <Button asChild disabled={!allDone}>
              <Link
                href={
                  allDone ? `/teacher/courses/${course.id}/assessment` : "#"
                }
                aria-disabled={!allDone}
                tabIndex={allDone ? undefined : -1}
                className={!allDone ? "pointer-events-none opacity-50" : ""}
              >
                Take assessment
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
