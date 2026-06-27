"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Generic two-state admin toggle (publish/unpublish, issue/revoke). Prototype
 * mode toggles local state; with Supabase wired these call server actions.
 */
export function ToggleControl({
  initial,
  onLabel,
  offLabel,
  onBadge,
  offBadge,
}: {
  initial: boolean;
  onLabel: string;
  offLabel: string;
  onBadge: string;
  offBadge: string;
}) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center gap-3">
      <Badge variant={on ? "brass" : "outline"}>{on ? onBadge : offBadge}</Badge>
      <Button
        size="sm"
        variant={on ? "outline" : "default"}
        onClick={() => setOn((v) => !v)}
      >
        {on ? offLabel : onLabel}
      </Button>
    </div>
  );
}
