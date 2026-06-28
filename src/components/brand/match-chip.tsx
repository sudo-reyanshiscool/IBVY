import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MatchLevel, MatchResult } from "@/lib/match";

const levelClasses: Record<MatchLevel, string> = {
  strong: "bg-ivy/10 text-ivy border-ivy/25",
  subject: "bg-brass-tint text-[#6b5325] border-brass/30",
  programme: "bg-sage-soft text-[#3f4a40] border-sage/40",
  weak: "bg-paper text-muted-foreground border-line",
};

/** Small editorial chip shown against vacancies and talent. */
export function MatchChip({
  match,
  className,
}: {
  match: Pick<MatchResult, "level" | "label">;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        levelClasses[match.level],
        className,
      )}
    >
      <Sparkles
        className={cn(
          "size-3",
          match.level === "strong" && "animate-pulse",
        )}
        aria-hidden
      />
      {match.label}
    </span>
  );
}
