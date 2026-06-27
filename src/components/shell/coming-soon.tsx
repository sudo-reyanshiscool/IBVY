import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

/** Placeholder for screens delivered in a later build phase. */
export function ComingSoon({
  phase,
  children,
}: {
  phase: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 px-6 py-14 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-brass-tint text-brass">
          <Compass className="size-5" aria-hidden />
        </div>
        <p className="max-w-md text-sm text-muted-foreground">{children}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-brass">
          {phase}
        </p>
      </CardContent>
    </Card>
  );
}
