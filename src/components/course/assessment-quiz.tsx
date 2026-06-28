"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Award, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

/**
 * Assessment flow. For the prototype, scoring runs client-side and a pass
 * shows a certificate-issued success state. With Supabase wired, scoring runs
 * in a security-definer RPC (correct answers never reach the client) and the
 * certification is issued server-side.
 */
export function AssessmentQuiz({
  course,
  certificateNumber,
}: {
  course: Course;
  certificateNumber: string;
}) {
  const questions = course.assessment.questions;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(
    null,
  );

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    const correct = questions.filter(
      (q) => answers[q.id] === q.correctIndex,
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    setResult({ score, passed: score >= course.assessment.passingScore });
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
  };

  if (result?.passed) {
    return (
      <Card className="border-brass/40">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-brass-tint text-brass">
            <Award className="size-7" aria-hidden />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Certified. Congratulations.
          </h2>
          <p className="max-w-md text-muted-foreground">
            You scored {result.score}% and passed {course.title}. Your
            certificate has been issued with a verifiable number.
          </p>
          <p className="rounded-md border border-brass/25 bg-brass-tint px-4 py-2 font-mono text-sm text-brass">
            {certificateNumber}
          </p>
          <div className="mt-2 flex gap-3">
            <Button asChild>
              <Link href="/teacher/certifications">View certifications</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/teacher/jobs">Browse vacancies</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {result && !result.passed && (
        <Card className="border-clay/30">
          <CardContent className="flex items-center justify-between gap-3 p-5">
            <p className="text-sm text-ink">
              You scored {result.score}%. The pass mark is{" "}
              {course.assessment.passingScore}%. Review the lessons and try again.
            </p>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="size-4" /> Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {questions.map((q, qi) => (
        <Card key={q.id}>
          <CardContent className="p-6">
            <p className="font-medium text-ink">
              {qi + 1}. {q.question}
            </p>
            <div className="mt-4 grid gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={!!result}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.id]: oi }))
                    }
                    className={cn(
                      "flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors",
                      selected
                        ? "border-ivy bg-ivy/5 text-ink"
                        : "border-line bg-paper-raised text-ink hover:border-sage",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                        selected
                          ? "border-ivy bg-ivy text-paper"
                          : "border-line",
                      )}
                    >
                      {selected && <CheckCircle2 className="size-3.5" />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {!result && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {Object.keys(answers).length} of {questions.length} answered
          </p>
          <Button size="lg" disabled={!allAnswered} onClick={submit}>
            Submit assessment
          </Button>
        </div>
      )}
    </div>
  );
}
