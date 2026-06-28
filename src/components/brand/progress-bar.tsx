"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Course completion bar: ivy fill on a sage-soft track. The fill eases up
 * from zero the first time it scrolls into view, with a soft brass glint. */
export function ProgressBar({
  value,
  className,
  showLabel = false,
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // The fill eases from 0 to the target on first view. Under reduced motion
    // the CSS transition is forced to near-zero, so this lands instantly.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Defer a tick so the transition runs from 0 to the target.
          requestAnimationFrame(() => setShown(pct));
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)}>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-sage-soft"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-ivy transition-[width] duration-1000 ease-out"
          style={{ width: `${shown}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
          {pct}%
        </span>
      )}
    </div>
  );
}
