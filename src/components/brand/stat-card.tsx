import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {Icon && <Icon className="size-4 text-sage" aria-hidden />}
        </div>
        <p className="mt-2 font-serif text-3xl font-semibold text-ink tabular-nums">
          {value}
        </p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
