"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Lock, Search } from "lucide-react";
import { MatchChip } from "@/components/brand/match-chip";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { MatchLevel } from "@/lib/match";

export interface TalentRow {
  id: string;
  name: string;
  subjects: string[];
  city?: string;
  yearsExperience: number;
  programmes: string[];
  status: string;
  match: { level: MatchLevel; label: string };
}

export function TalentBrowser({ talent }: { talent: TalentRow[] }) {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("all");

  const subjects = useMemo(
    () => Array.from(new Set(talent.flatMap((t) => t.subjects))).sort(),
    [talent],
  );

  const filtered = talent.filter((t) => {
    if (subject !== "all" && !t.subjects.includes(subject)) return false;
    if (q && !`${t.name} ${t.city ?? ""} ${t.subjects.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  const selectClass =
    "h-10 rounded-md border border-line bg-paper-raised px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, subject, city"
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-ink">{t.name}</h3>
                  <p className="text-sm text-brass">{t.subjects.join(", ")}</p>
                </div>
                <StatusPill status={t.status} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {t.city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {t.city}
                  </span>
                )}
                <span>{t.yearsExperience} yrs</span>
                {t.programmes.map((p) => (
                  <Badge key={p} variant="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
              <div className="mt-3">
                <MatchChip match={t.match} />
              </div>
              <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="size-3" /> Contact details unlock on invite
              </p>
              <Button asChild size="sm" variant="outline" className="mt-3 w-full">
                <Link href={`/school/talent/${t.id}`}>View profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
