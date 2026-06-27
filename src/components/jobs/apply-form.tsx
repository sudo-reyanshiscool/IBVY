"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { applyToVacancy } from "@/lib/teacher/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ApplyForm({ vacancyId }: { vacancyId: string }) {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-ivy/20 bg-ivy/5 p-5">
        <span className="inline-flex items-center gap-2 font-medium text-ivy">
          <CheckCircle2 className="size-5" /> Application submitted
        </span>
        <p className="text-sm text-muted-foreground">
          The school can now see your profile and certifications in their
          pipeline.
        </p>
        <Button asChild size="sm" variant="outline">
          <Link href="/teacher/applications">Track your applications</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="cover">Cover note</Label>
      <textarea
        id="cover"
        rows={5}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Tell the school why you are a strong fit."
        className="flex w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await applyToVacancy(vacancyId, note);
            setDone(true);
          })
        }
      >
        {pending ? "Submitting..." : "Submit application"}
      </Button>
    </div>
  );
}
