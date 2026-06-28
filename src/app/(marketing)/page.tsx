import Link from "next/link";
import {
  ArrowRight,
  Search,
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  MapPin,
  Sparkles,
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge variant="outline" className="mb-6 gap-1.5 py-1 pl-2 pr-3">
              <Sparkles className="size-3.5 text-brass" /> India-first IB teacher
              engine
            </Badge>
            <h1 className="font-serif text-5xl font-semibold leading-[1.04] text-ink sm:text-6xl">
              Source, train, certify, and{" "}
              <span className="bg-gradient-to-r from-ivy via-ivy-tint to-iris bg-clip-text text-transparent">
                place IB teachers.
              </span>
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
            <p className="mt-5 text-sm text-muted-foreground">
              No sign-in needed to explore.{" "}
              <Link
                href="/wireframes"
                className="font-medium text-ivy underline-offset-4 hover:underline"
              >
                See the course &amp; exam wireframes
              </Link>
              .
            </p>
          </div>

          {/* Glass core-loop panel */}
          <Card className="glass-strong overflow-hidden rounded-3xl p-1">
            <CardContent className="p-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass">
                The core loop
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">
                One engine, end to end
              </h2>
              <ol className="mt-6 space-y-3">
                {LOOP.map((item, i) => (
                  <li
                    key={item.step}
                    className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/45 px-4 py-3 backdrop-blur-md"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ivy-tint to-ivy font-serif text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
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
      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <Card className="glass-strong rounded-3xl">
          <CardContent className="px-8 py-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-ink">
              A supply problem disguised as a hiring problem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              India&rsquo;s IB and international-curriculum schools have grown
              more than 40% in five years, but the supply of qualified IB
              teachers has not kept pace. The front of the room is empty. {""}
              {SITE_NAME} builds the teachers the system needs.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* The engine */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          One engine, three moves
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ENGINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ivy-tint to-ivy text-white shadow-[0_8px_18px_-8px_rgba(12,110,87,0.6)]">
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
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="glass-dark grid gap-8 rounded-3xl px-8 py-12 text-white md:grid-cols-2 md:items-center">
          <div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
              <MapPin className="size-6 text-brass" aria-hidden />
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold">
              Domestic first
            </h2>
          </div>
          <p className="text-white/85">
            Incumbents export India&rsquo;s best teachers abroad. {SITE_NAME}{" "}
            keeps them here, building the talent that India&rsquo;s own
            international schools need. The same train-and-certify rail upskills
            teachers becoming IB and existing staff at schools transforming to
            IB.
          </p>
        </div>
      </section>

      {/* The board */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
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
            <Card key={m.name} className="text-center">
              <CardContent className="p-5">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brass-tint font-serif text-sm font-semibold text-[#7a5b1e]">
                  {m.initials}
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* The three doors */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Three doors, one engine
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {MARKETING_DOORS.map((door) => (
            <Card key={door.href} className="flex flex-col hover:-translate-y-1">
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
      </section>

      {/* Prototype explorer (demo mode only) */}
      {DEMO_MODE && (
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <Card className="glass-strong rounded-3xl text-center">
            <CardContent className="px-8 py-12">
              <Badge variant="brass" className="mb-3">
                <ShieldCheck className="size-3.5" /> Prototype
              </Badge>
              <h2 className="font-serif text-2xl font-semibold text-ink">
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
