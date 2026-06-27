"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { School } from "@/lib/types";

export function SchoolProfileForm({ school }: { school: School }) {
  const [form, setForm] = useState({
    schoolName: school.schoolName,
    schoolType: school.schoolType,
    city: school.city ?? "",
    website: school.website ?? "",
    contactName: school.contactName ?? "",
    contactPhone: school.contactPhone ?? "",
    size: school.size ?? "",
  });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  const selectClass =
    "h-10 w-full rounded-md border border-line bg-paper-raised px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">School name</Label>
            <Input
              id="name"
              value={form.schoolName}
              onChange={(e) => set("schoolName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">School type</Label>
            <select
              id="type"
              className={selectClass}
              value={form.schoolType}
              onChange={(e) => set("schoolType", e.target.value)}
            >
              <option value="established_ib">Established IB</option>
              <option value="transforming">Transforming to IB</option>
            </select>
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
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact name</Label>
            <Input
              id="contactName"
              value={form.contactName}
              onChange={(e) => set("contactName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input
              id="contactPhone"
              value={form.contactPhone}
              onChange={(e) => set("contactPhone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              value={form.size}
              onChange={(e) => set("size", e.target.value)}
            />
          </div>
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

      <aside>
        <div className="rounded-lg border border-line bg-paper-raised p-5 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-lg bg-ivy font-serif text-2xl font-semibold text-paper">
            {school.schoolName.charAt(0)}
          </div>
          <p className="mt-3 font-medium text-ink">{school.schoolName}</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <Upload className="size-4" /> Upload logo
          </Button>
        </div>
      </aside>
    </div>
  );
}
