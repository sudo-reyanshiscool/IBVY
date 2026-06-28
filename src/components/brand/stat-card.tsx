import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/brand/count-up";

/** Editorial metric tile: large brass numeral, quiet label. */
export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  hint?: string;
}) {
  // A plain whole number counts up; anything formatted (ranges, currency,
  // percentages) is rendered verbatim.
  const numeric =
    typeof value === "number"
      ? value
      : /^\d+$/.test(value.trim())
        ? Number(value.trim())
        : null;
  return (
    <Card className="hover-lift group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {Icon && (
            <Icon
              className="size-4 text-sage transition-colors group-hover:text-brass"
              aria-hidden
            />
          )}
        </div>
        <p className="mt-2 font-serif text-3xl font-semibold text-ink tabular-nums">
          {numeric !== null ? <CountUp value={numeric} /> : value}
        </p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
