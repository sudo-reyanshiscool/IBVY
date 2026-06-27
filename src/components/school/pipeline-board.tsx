"use client";

import { useState } from "react";
import { BadgeCheck, IndianRupee } from "lucide-react";
import { MatchChip } from "@/components/brand/match-chip";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MatchLevel } from "@/lib/match";

export interface Applicant {
  applicationId: string;
  teacherName: string;
  subjects: string;
  status: string;
  match: { level: MatchLevel; label: string };
}

const STAGES = [
  { key: "applied", label: "Applied" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview", label: "Interview" },
  { key: "offered", label: "Offered" },
  { key: "hired", label: "Hired" },
];

export function PipelineBoard({
  applicants,
  feeLabel,
}: {
  applicants: Applicant[];
  feeLabel: string;
}) {
  const [board, setBoard] = useState<Record<string, string>>(
    Object.fromEntries(applicants.map((a) => [a.applicationId, a.status])),
  );
  const [justHired, setJustHired] = useState<string | null>(null);

  const move = (id: string, status: string) => {
    setBoard((b) => ({ ...b, [id]: status }));
    if (status === "hired") setJustHired(id);
  };

  return (
    <div>
      {justHired && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-ivy/25 bg-ivy/5 px-4 py-3 text-sm text-ink">
          <BadgeCheck className="size-5 text-ivy" />
          Placement created. The vacancy is now filled and a fee of{" "}
          <span className="inline-flex items-center font-medium">
            <IndianRupee className="size-3.5" />
            {feeLabel}
          </span>{" "}
          is recorded as pending.
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-5">
        {STAGES.map((stage) => {
          const inStage = applicants.filter(
            (a) => board[a.applicationId] === stage.key,
          );
          return (
            <div key={stage.key} className="flex flex-col">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {stage.label}
                </span>
                <span className="text-xs text-sage">{inStage.length}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-lg bg-sage-soft/40 p-2">
                {inStage.map((a) => (
                  <Card key={a.applicationId}>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-ink">
                        {a.teacherName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.subjects}
                      </p>
                      <div className="mt-2">
                        <MatchChip match={a.match} />
                      </div>
                      <select
                        value={board[a.applicationId]}
                        onChange={(e) =>
                          move(a.applicationId, e.target.value)
                        }
                        className={cn(
                          "mt-2 w-full rounded-md border border-line bg-paper px-2 py-1 text-xs text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            Move to {s.label}
                          </option>
                        ))}
                      </select>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
