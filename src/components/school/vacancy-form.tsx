"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Create-vacancy form. Prototype mode confirms without persisting; with
 * Supabase wired this inserts into vacancies (RLS: schools write their own).
 */
export function VacancyForm() {
  const [done, setDone] = useState(false);

  const textareaClass =
    "flex w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const selectClass =
    "h-10 w-full rounded-md border border-line bg-paper-raised px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (done) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-ivy/20 bg-ivy/5 p-6">
        <span className="inline-flex items-center gap-2 font-medium text-ivy">
          <CheckCircle2 className="size-5" /> Vacancy created
        </span>
        <p className="text-sm text-muted-foreground">
          Your vacancy is now open and visible to the certified talent pool.
        </p>
        <Button asChild size="sm">
          <Link href="/school/vacancies">Back to vacancies</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="max-w-2xl space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Role title</Label>
        <Input id="title" required placeholder="DP Mathematics Teacher" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" required placeholder="Mathematics" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="programme">Programme</Label>
          <select id="programme" className={selectClass} defaultValue="DP">
            <option value="PYP">PYP</option>
            <option value="MYP">MYP</option>
            <option value="DP">DP</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Mumbai" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary range</Label>
          <Input id="salary" placeholder="INR 12 to 16 lakh per annum" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea id="description" rows={4} className={textareaClass} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <textarea id="requirements" rows={3} className={textareaClass} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Publish vacancy</Button>
        <Button asChild variant="ghost">
          <Link href="/school/vacancies">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
