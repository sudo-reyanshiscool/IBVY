import type { Metadata } from "next";
import { GraduationCap, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/brand/reveal";
import { PilotForm } from "@/components/marketing/pilot-form";

export const metadata: Metadata = {
  title: "Transform to IB",
  description:
    "Upskill the staff you already have towards IB-readiness, on the same train-and-certify rail.",
};

const POINTS = [
  {
    icon: Users,
    title: "Invite your staff",
    body: "Bring your existing teachers onto the platform and sponsor them into the right courses.",
  },
  {
    icon: GraduationCap,
    title: "Same rail, same rigour",
    body: "Your staff train and certify on the identical board-designed courses as everyone else.",
  },
  {
    icon: TrendingUp,
    title: "Track the cohort",
    body: "Watch your staff progress to certification on a single staff-in-training view.",
  },
];

export default function TransformPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="ibvy-aurora absolute -left-20 -top-20 size-72 rounded-full bg-ivy/10 blur-3xl" />
          <div className="ibvy-float absolute -right-10 top-6 size-64 rounded-full bg-brass/10 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-4xl px-6 pb-12 pt-20 text-center">
          <Badge variant="brass" className="mb-5 animate-fade-up">
            For transforming schools
          </Badge>
          <h1 className="animate-fade-up font-serif text-5xl font-semibold leading-tight text-ink [animation-delay:80ms]">
            Transform to IB.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:160ms]">
            Moving from CBSE or another curriculum towards the IB? Upskill the
            staff you already have, rather than starting from scratch.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 120}>
                <Card className="hover-lift group h-full">
                  <CardContent className="p-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-ivy text-paper transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h2 className="mt-4 font-serif text-lg font-semibold text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.body}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-paper-raised">
        <Reveal className="mx-auto w-full max-w-3xl px-6 py-16">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-ink">
              Request a pilot
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Tell us about your school and your IB-readiness goals, and we will
              design a staff-training pilot.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-line bg-paper p-6 shadow-sm sm:p-8">
            <PilotForm defaultSchoolType="transforming" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
