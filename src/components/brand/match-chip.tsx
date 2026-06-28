import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MatchLevel, MatchResult } from "@/lib/match";

const levelClasses: Record<MatchLevel, string> = {
  strong: "bg-ivy/18 text-[#5fd3a6] border-ivy/35",
  subject: "bg-brass-tint text-brass border-brass/35",
  programme: "bg-white/8 text-[#aebfb6] border-white/14",
  weak: "bg-white/5 text-muted-foreground border-white/12",
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
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        levelClasses[match.level],
        className,
      )}
    >
      <Sparkles className="size-3" aria-hidden />
      {match.label}
    </span>
  );
}
