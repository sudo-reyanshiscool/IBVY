import { cn } from "@/lib/utils";

/** Course completion bar: ivy fill on a sage-soft track. */
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
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-white/45 ring-1 ring-inset ring-white/60 backdrop-blur-sm"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-ivy-tint to-ivy transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
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
