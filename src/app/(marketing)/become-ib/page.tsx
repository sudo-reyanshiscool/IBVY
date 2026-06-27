import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Briefcase, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Become IB",
  description:
    "Train at low or no upfront cost, certify with the IBvy educator board, and get placed in an IB school.",
};

const STEPS = [
  {
    icon: BookOpen,
    title: "Train",
    body: "Work through board-designed courses at your own pace, with real IB pedagogy, not theory.",
  },
  {
    icon: Award,
    title: "Certify",
    body: "Pass the course assessment and earn a verifiable IBvy certificate that schools trust.",
  },
  {
    icon: Briefcase,
    title: "Get placed",
    body: "Appear in the certified talent pool and apply to vacancies matched to your subjects.",
  },
];

export default function BecomeIbPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-6 pb-12 pt-20 text-center">
        <Badge variant="brass" className="mb-5">
          For teachers
        </Badge>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-ink">
          Become an IB teacher.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Train at low or no upfront cost, certify with the educator board, and
          get placed in an IB school here in India.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/signup">
              Start training <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/courses">Browse courses</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title}>
                <CardContent className="p-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-ivy text-paper">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h2 className="mt-4 font-serif text-xl font-semibold text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center">
          <IndianRupee className="size-7 text-brass" aria-hidden />
          <h2 className="font-serif text-3xl font-semibold text-ink">
            Low or no upfront cost
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            We earn when you get hired, so the training rail is built to get you
            placed, not to bill you upfront. Your certificate carries a verifiable
            number that links straight back to IBvy from your CV.
          </p>
          <Button asChild className="mt-2">
            <Link href="/signup">Create your account</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
