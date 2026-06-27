"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Teacher } from "@/lib/types";

/**
 * Teacher profile editor. In the prototype, Save updates local state and
 * confirms. With Supabase wired, this writes teacher_profiles (RLS: self) and
 * uploads to Storage.
 */
export function ProfileForm({ teacher }: { teacher: Teacher }) {
  const [form, setForm] = useState({
    subjects: teacher.subjects.join(", "),
    yearsExperience: String(teacher.yearsExperience),
    city: teacher.city ?? "",
    qualifications: teacher.qualifications ?? "",
    phone: teacher.phone ?? "",
    bio: teacher.bio ?? "",
  });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects</Label>
            <Input
              id="subjects"
              value={form.subjects}
              onChange={(e) => set("subjects", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Years of experience</Label>
            <Input
              id="years"
              type="number"
              value={form.yearsExperience}
              onChange={(e) => set("yearsExperience", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quals">Qualifications</Label>
          <Input
            id="quals"
            value={form.qualifications}
            onChange={(e) => set("qualifications", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={4}
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            className="flex w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setSaved(true)}>Save profile</Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-ivy">
              <CheckCircle2 className="size-4" /> Saved
            </span>
          )}
        </div>
      </div>

      {/* Photo and resume */}
      <aside className="space-y-5">
        <div className="rounded-lg border border-line bg-paper-raised p-5 text-center">
          <div
            className="mx-auto flex size-20 items-center justify-center rounded-full font-serif text-2xl font-semibold text-paper"
            style={{ backgroundColor: teacher.photoColour }}
          >
            {teacher.fullName.charAt(0)}
          </div>
          <p className="mt-3 font-medium text-ink">{teacher.fullName}</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <Upload className="size-4" /> Upload photo
          </Button>
        </div>
        <div className="rounded-lg border border-line bg-paper-raised p-5">
          <p className="text-sm font-medium text-ink">Resume</p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, shared with schools once you apply or are invited.
          </p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <Upload className="size-4" /> Upload resume
          </Button>
        </div>
      </aside>
    </div>
  );
}
