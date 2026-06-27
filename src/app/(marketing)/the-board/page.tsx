import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { BOARD } from "@/lib/mock/board";

export const metadata: Metadata = {
  title: "The educator board",
  description:
    "The IBvy curriculum is designed by IB veterans, five based in India and five respected globally.",
};

function BoardGrid({ group }: { group: "india" | "global" }) {
  const members = BOARD.filter((m) => m.group === group);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <Card key={m.name}>
          <CardContent className="flex items-start gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brass-tint font-serif text-sm font-semibold text-brass">
              {m.initials}
            </div>
            <div>
              <p className="font-semibold text-ink">{m.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              <p className="mt-1 text-xs text-brass">{m.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function TheBoardPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink">
          The educator board
        </h1>
        <p className="mt-3 text-muted-foreground">
          Our curriculum is designed and overseen by experienced IB educators.
          They set the standard that every IBvy certificate represents.
        </p>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">
        India-based veterans
      </h2>
      <div className="mt-5">
        <BoardGrid group="india" />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">
        Globally respected educators
      </h2>
      <div className="mt-5">
        <BoardGrid group="global" />
      </div>
    </section>
  );
}
