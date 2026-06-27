"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, IndianRupee, Search } from "lucide-react";
import { MatchChip } from "@/components/brand/match-chip";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { MatchLevel } from "@/lib/match";

export interface JobRow {
  id: string;
  title: string;
  subject: string;
  programme?: string;
  location?: string;
  salaryRange?: string;
  schoolName: string;
  match: { level: MatchLevel; label: string };
}

export function JobsBrowser({ jobs }: { jobs: JobRow[] }) {
  const [q, setQ] = useState("");
  const [programme, setProgramme] = useState("all");
  const [subject, setSubject] = useState("all");

  const subjects = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.subject))).sort(),
    [jobs],
  );
  const programmes = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.programme).filter(Boolean))) as string[],
    [jobs],
  );

  const filtered = jobs.filter((j) => {
    if (programme !== "all" && j.programme !== programme) return false;
    if (subject !== "all" && j.subject !== subject) return false;
    if (q && !`${j.title} ${j.schoolName} ${j.location ?? ""}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  const selectClass =
    "h-10 rounded-md border border-line bg-paper-raised px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roles, schools, cities"
            className="pl-9"
          />
        </div>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={selectClass}
          aria-label="Filter by subject"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          className={selectClass}
          aria-label="Filter by programme"
        >
          <option value="all">All programmes</option>
          {programmes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            No vacancies match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((j) => (
            <Card key={j.id}>
              <CardContent className="flex flex-wrap items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {j.title}
                    </h3>
                    <MatchChip match={j.match} />
                  </div>
                  <p className="mt-1 text-sm text-brass">{j.schoolName}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    {j.programme && <Badge variant="secondary">{j.programme}</Badge>}
                    <span>{j.subject}</span>
                    {j.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" /> {j.location}
                      </span>
                    )}
                    {j.salaryRange && (
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="size-3.5" /> {j.salaryRange}
                      </span>
                    )}
                  </div>
                </div>
                <Button asChild size="sm">
                  <Link href={`/teacher/jobs/${j.id}`}>View and apply</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
