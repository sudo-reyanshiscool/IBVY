"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AdminSchoolRow {
  id: string;
  name: string;
  type: string;
  city?: string;
  verified: boolean;
}

export function AdminSchoolsTable({ schools }: { schools: AdminSchoolRow[] }) {
  const [verified, setVerified] = useState<Record<string, boolean>>(
    Object.fromEntries(schools.map((s) => [s.id, s.verified])),
  );

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">School</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Verified</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {schools.map((s) => (
            <tr key={s.id} className="bg-paper-raised">
              <td className="px-4 py-3 font-medium text-ink">{s.name}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {s.type === "transforming" ? "Transforming" : "Established IB"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{s.city}</td>
              <td className="px-4 py-3">
                <Badge variant={verified[s.id] ? "brass" : "outline"}>
                  {verified[s.id] ? "Verified" : "Unverified"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  size="sm"
                  variant={verified[s.id] ? "outline" : "default"}
                  onClick={() =>
                    setVerified((v) => ({ ...v, [s.id]: !v[s.id] }))
                  }
                >
                  {verified[s.id] ? "Unverify" : "Verify"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
