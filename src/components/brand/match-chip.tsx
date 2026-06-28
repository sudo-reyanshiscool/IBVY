import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MatchLevel, MatchResult } from "@/lib/match";

const levelClasses: Record<MatchLevel, string> = {
  strong: "bg-ivy/12 text-ivy border-ivy/25 backdrop-blur-sm",
  subject: "bg-brass-tint text-[#7a5b1e] border-[#caa14e]/35 backdrop-blur-sm",
  programme: "bg-iris/12 text-[#4b46c4] border-iris/25 backdrop-blur-sm",
  weak: "bg-white/40 text-muted-foreground border-white/50 backdrop-blur-sm",
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
