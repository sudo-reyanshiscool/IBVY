import Link from "next/link";
import {
  ArrowRight,
  Search,
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_NAME, MARKETING_DOORS } from "@/lib/constants";
import { BOARD } from "@/lib/mock/board";
import { DEMO_MODE } from "@/lib/config";

const ENGINE = [
  {
    icon: Search,
    title: "Source",
    body: "We reach ambitious teachers across India and bring them onto a single training rail.",
  },
  {
    icon: GraduationCap,
    title: "Train",
    body: "An expert educator board designs the courses. Teachers train at low or no upfront cost.",
  },
  {
    icon: BadgeCheck,
    title: "Place",
    body: "Vetted partner schools hire from the certified pool. Schools pay only on a successful placement.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-20 text-center">
        <Badge variant="brass" className="mb-6">
          India-first IB teacher engine
        </Badge>
        <h1 className="mx-auto max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
          Source, train, certify, and place IB teachers.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {SITE_NAME} is read as IB plus ivy: IB credentials with an Ivy League
          weight. We keep qualified teachers inside India&rsquo;s own
          international schools rather than exporting them abroad.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/become-ib">
              Become IB <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/hiring">Hire teachers</Link>
          </Button>
        </div>
      </section>

      {/* The problem */}
      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-ink">
            A supply problem disguised as a hiring problem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            India&rsquo;s IB and international-curriculum schools have grown more
            than 40% in five years, but the supply of qualified IB teachers has
            not kept pace. The front of the room is empty. IBvy builds the
            teachers the system needs.
          </p>
        </div>
      </section>

      {/* The engine */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          One engine, three moves
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ENGINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-ivy text-paper">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <span className="font-serif text-sm text-brass">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Differentiator */}
      <section className="border-y border-line bg-ivy text-paper">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <MapPin className="size-7 text-brass" aria-hidden />
            <h2 className="mt-4 font-serif text-3xl font-semibold">
              Domestic first
            </h2>
          </div>
          <p className="text-paper/85">
            Incumbents export India&rsquo;s best teachers abroad. IBvy keeps them
            here, building the talent that India&rsquo;s own international schools
            need. The same train-and-certify rail upskills teachers becoming IB
            and existing staff at schools transforming to IB.
          </p>
        </div>
      </section>

      {/* The board */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink">
              The educator board
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The curriculum is designed by IB veterans, five based in India and
              five respected globally.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/the-board">
              Meet the board <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BOARD.slice(0, 5).map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-line bg-paper-raised p-4 text-center"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brass-tint font-serif text-sm font-semibold text-brass">
                {m.initials}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{m.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The three doors */}
      <section className="border-t border-line bg-paper-raised">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Three doors, one engine
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {MARKETING_DOORS.map((door) => (
              <Card key={door.href} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-brass">
                    {door.audience}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {door.title}
                  </h3>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {door.blurb}
                  </p>
                  <Link
                    href={door.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-ivy hover:text-ivy-tint"
                  >
                    Learn more <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype explorer (demo mode only) */}
      {DEMO_MODE && (
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="rounded-xl border border-brass/30 bg-brass-tint/40 p-8 text-center">
            <Badge variant="brass" className="mb-3">
              <ShieldCheck className="size-3.5" /> Prototype
            </Badge>
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Explore the working prototype
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              No sign-in needed. Step into each workspace with seeded demo data,
              and switch between teachers and schools from the top bar.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/teacher">Teacher workspace</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/school">School workspace</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin">Admin workspace</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
