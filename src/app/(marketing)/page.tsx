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
import { SITE_NAME, SITE_TAGLINE, MARKETING_DOORS } from "@/lib/constants";
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

const LOOP = [
  { step: "Source", note: "Teacher signs up and builds a profile" },
  { step: "Train", note: "Board-designed courses, lesson by lesson" },
  { step: "Certify", note: "Pass the assessment, earn a verifiable badge" },
  { step: "Match", note: "Appear in the talent pool against vacancies" },
  { step: "Place", note: "A school hires, a placement fee is tracked" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge variant="outline" className="mb-6 gap-1.5 py-1 pl-2 pr-3">
              <span className="size-1.5 rounded-full bg-brass" /> India-first IB
              teacher engine
            </Badge>
            <h1 className="font-serif text-5xl font-medium leading-[1.06] tracking-tight text-ink sm:text-6xl">
              Source, train, certify, and{" "}
              <span className="text-ivy-tint">place IB teachers.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {SITE_NAME} is read as IB plus ivy: {SITE_TAGLINE}. We keep
              qualified teachers inside India&rsquo;s own international schools
              rather than exporting them abroad.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/become-ib">
                  Become IB <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/hiring">Hire teachers</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No sign-in needed to explore.{" "}
              <Link
                href="/wireframes"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ivy-tint"
              >
                See the course &amp; exam wireframes
              </Link>
              .
            </p>
          </div>

          {/* Glass core-loop panel */}
          <Card className="glass-strong rounded-2xl">
            <CardContent className="p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass">
                The core loop
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium text-ink">
                One engine, end to end
              </h2>
              <ol className="mt-6 space-y-2.5">
                {LOOP.map((item, i) => (
                  <li
                    key={item.step}
                    className="glass-inset flex items-center gap-4 rounded-lg px-4 py-3"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ivy/40 bg-ivy/15 font-serif text-sm font-medium text-ivy-tint">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {item.step}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The problem */}
      <section className="mx-auto w-full max-w-4xl px-6 py-14">
        <div className="border-t border-line pt-12 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-brass">
            The problem
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-medium leading-snug text-ink">
            A supply problem disguised as a hiring problem
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            India&rsquo;s IB and international-curriculum schools have grown more
            than 40% in five years, but the supply of qualified IB teachers has
            not kept pace. The front of the room is empty. {SITE_NAME} builds
            the teachers the system needs.
          </p>
        </div>
      </section>

      {/* The engine */}
      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <h2 className="text-center font-serif text-3xl font-medium text-ink">
          One engine, three moves
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ENGINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-ivy-tint">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <span className="font-serif text-sm text-brass">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Differentiator */}
      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="grid gap-8 rounded-2xl border border-ivy/25 bg-ivy/8 px-8 py-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex size-11 items-center justify-center rounded-lg border border-brass/30 bg-brass-tint">
              <MapPin className="size-5 text-brass" aria-hidden />
            </div>
            <h2 className="mt-5 font-serif text-3xl font-medium text-ink">
              Domestic first
            </h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Incumbents export India&rsquo;s best teachers abroad. {SITE_NAME}{" "}
            keeps them here, building the talent that India&rsquo;s own
            international schools need. The same train-and-certify rail upskills
            teachers becoming IB and existing staff at schools transforming to
            IB.
          </p>
        </div>
      </section>

      {/* The board */}
      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-medium text-ink">
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
            <Card key={m.name} className="text-center">
              <CardContent className="p-5">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-brass/30 bg-brass-tint font-serif text-sm font-medium text-brass">
                  {m.initials}
                </div>
                <p className="mt-3 text-sm font-medium text-ink">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* The three doors */}
      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <h2 className="text-center font-serif text-3xl font-medium text-ink">
          Three doors, one engine
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {MARKETING_DOORS.map((door) => (
            <Card key={door.href} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-xs font-medium uppercase tracking-wide text-brass">
                  {door.audience}
                </span>
                <h3 className="font-serif text-xl font-medium text-ink">
                  {door.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {door.blurb}
                </p>
                <Link
                  href={door.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-ivy-tint hover:text-ink"
                >
                  Learn more <ArrowRight className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prototype explorer (demo mode only) */}
      {DEMO_MODE && (
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <Card className="glass-strong rounded-2xl text-center">
            <CardContent className="px-8 py-12">
              <Badge variant="brass" className="mb-4">
                <ShieldCheck className="size-3.5" /> Prototype
              </Badge>
              <h2 className="font-serif text-2xl font-medium text-ink">
                Explore the working prototype
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                No sign-in needed. Step into each workspace with seeded demo
                data, and switch between teachers and schools from the top bar.
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
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}
