"use client";

import * as React from "react";

/**
 * Counts a number up from zero the first time it scrolls into view. Used for
 * the big editorial numerals on stat tiles and the admin dashboard. Falls back
 * to the final value immediately when reduced motion is requested.
 */
export function CountUp({
  value,
  durationMs = 1200,
  prefix = "",
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let start = 0;
    const run = () => {
      // Respect reduced motion by snapping straight to the final value.
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        setDisplay(value);
        return;
      }
      const step = (now: number) => {
        if (!start) start = now;
        const progress = Math.min((now - start) / durationMs, 1);
        // easeOutCubic for a quick settle.
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const rounded = Math.round(display);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {rounded.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
