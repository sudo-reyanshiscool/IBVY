"use client";

import { useState } from "react";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";

export interface AdminLeadRow {
  id: string;
  schoolName: string;
  contactName?: string;
  email: string;
  city?: string;
  type?: string;
  message?: string;
  status: string;
  createdAt: string;
}

const LEAD_STATES = ["new", "contacted", "converted", "closed"];

export function AdminLeadsTable({ leads }: { leads: AdminLeadRow[] }) {
  const [status, setStatus] = useState<Record<string, string>>(
    Object.fromEntries(leads.map((l) => [l.id, l.status])),
  );

  return (
    <div className="grid gap-4">
      {leads.map((l) => (
        <Card key={l.id}>
          <CardContent className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-semibold text-ink">
                    {l.schoolName}
                  </h3>
                  {l.type && (
                    <span className="text-xs text-muted-foreground">
                      {l.type === "transforming"
                        ? "Transforming"
                        : "Established IB"}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {l.contactName ? `${l.contactName} · ` : ""}
                  {l.email}
                  {l.city ? ` · ${l.city}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={status[l.id]} />
                <select
                  value={status[l.id]}
                  onChange={(e) =>
                    setStatus((s) => ({ ...s, [l.id]: e.target.value }))
                  }
                  className="rounded-md border border-line bg-paper px-2 py-1 text-xs text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {LEAD_STATES.map((f) => (
                    <option key={f} value={f}>
                      Mark {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {l.message && (
              <p className="mt-3 border-t border-line pt-3 text-sm text-ink/80">
                {l.message}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
