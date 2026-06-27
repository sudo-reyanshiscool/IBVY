"use client";

import { useState } from "react";
import { StatusPill } from "@/components/brand/status-pill";

export interface AdminPlacementRow {
  id: string;
  teacherName: string;
  schoolName: string;
  fee: string;
  feeStatus: string;
}

const FEE_STATES = ["pending", "invoiced", "paid"];

export function AdminPlacementsTable({
  placements,
}: {
  placements: AdminPlacementRow[];
}) {
  const [status, setStatus] = useState<Record<string, string>>(
    Object.fromEntries(placements.map((p) => [p.id, p.feeStatus])),
  );

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Teacher</th>
            <th className="px-4 py-3 font-medium">School</th>
            <th className="px-4 py-3 font-medium">Fee</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Update</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {placements.map((p) => (
            <tr key={p.id} className="bg-paper-raised">
              <td className="px-4 py-3 font-medium text-ink">{p.teacherName}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.schoolName}</td>
              <td className="px-4 py-3 text-ink">{p.fee}</td>
              <td className="px-4 py-3">
                <StatusPill status={status[p.id]} />
              </td>
              <td className="px-4 py-3 text-right">
                <select
                  value={status[p.id]}
                  onChange={(e) =>
                    setStatus((s) => ({ ...s, [p.id]: e.target.value }))
                  }
                  className="rounded-md border border-line bg-paper px-2 py-1 text-xs text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {FEE_STATES.map((f) => (
                    <option key={f} value={f}>
                      Mark {f}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
