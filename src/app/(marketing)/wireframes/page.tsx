import Link from "next/link";
import type { Metadata } from "next";
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  ListChecks,
  FileText,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Course & exam wireframes",
  description:
    "Low-fidelity wireframes for the IBvy course player and the teacher assessment, annotated to show the learning and certification flow.",
};

/* A skeleton line, the wireframe stand-in for real copy. */
function Bar({ w = "100%", h = 10 }: { w?: string; h?: number }) {
  return (
    <span
      className="block rounded-full bg-white/12"
      style={{ width: w, height: h }}
      aria-hidden
    />
  );
}

/* A numbered annotation pin used to label parts of each wireframe. */
function Pin({ n }: { n: number }) {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-ivy/40 bg-ivy/20 text-[11px] font-semibold text-ivy-tint">
      {n}
    </span>
  );
}

function Annotations({ items }: { items: { n: number; text: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((a) => (
        <li key={a.n} className="flex items-start gap-3">
          <Pin n={a.n} />
          <span className="text-sm text-muted-foreground">{a.text}</span>
        </li>
      ))}
    </ul>
  );
}

/* The dashed frame that signals "this is a wireframe, not the finished UI". */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-white/18 bg-black/20 p-4 sm:p-6">
      {children}
    </div>
  );
}

export default function WireframesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Intro */}
      <div className="max-w-3xl">
        <Badge variant="outline" className="mb-5 gap-1.5">
          <FileText className="size-3.5 text-brass" /> Wireframes
        </Badge>
        <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          The course and the exam, wireframed
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A low-fidelity look at the two screens at the heart of the {SITE_NAME}{" "}
          training rail: the course player a teacher works through, and the
          assessment that certifies them. These are layout blueprints. The live
          versions sit inside the teacher workspace.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/teacher/courses">
              Open a live course <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#exam-wireframe">Jump to the exam</Link>
          </Button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* COURSE PLAYER WIREFRAME                                            */}
      {/* ----------------------------------------------------------------- */}
      <section id="course-wireframe" className="mt-16 scroll-mt-24">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-ivy-tint">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">
              1. Course player
            </h2>
            <p className="text-sm text-muted-foreground">
              Route:{" "}
              <code className="text-ivy-tint">/teacher/courses/[id]</code>
            </p>
          </div>
        </div>

        <Card className="glass-strong rounded-2xl">
          <CardContent className="grid gap-8 p-6 lg:grid-cols-[1.55fr_1fr] lg:p-8">
            {/* The wireframe itself */}
            <Frame>
              {/* Top: title + progress */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <Bar w="180px" h={14} />
                  <Bar w="120px" h={8} />
                </div>
                <span className="rounded-full border border-dashed border-white/20 px-3 py-1 text-xs text-muted-foreground">
                  Progress 60%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-3/5 rounded-full bg-ivy-tint" />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[160px_1fr]">
                {/* Module / lesson list */}
                <div className="glass-inset space-y-3 rounded-lg p-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Module 1
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-ivy-tint" />
                      <Bar w="80%" h={7} />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-ivy-tint" />
                      <Bar w="70%" h={7} />
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-ivy/15 px-1.5 py-1">
                      <PlayCircle className="size-4 text-ivy-tint" />
                      <Bar w="85%" h={7} />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Module 2
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Circle className="size-4 text-white/25" />
                      <Bar w="75%" h={7} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="size-4 text-white/25" />
                      <Bar w="60%" h={7} />
                    </div>
                  </div>
                </div>

                {/* Lesson content */}
                <div className="space-y-4">
                  <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <PlayCircle className="size-10 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <Bar w="55%" h={12} />
                    <Bar />
                    <Bar w="92%" />
                    <Bar w="96%" />
                    <Bar w="40%" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-ivy px-4 py-2 text-xs font-semibold text-white">
                      <CheckCircle2 className="size-4" /> Mark lesson complete
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2 text-xs text-muted-foreground">
                      Next lesson <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                  <div className="rounded-lg border border-dashed border-brass/40 bg-brass-tint px-4 py-3 text-xs text-brass">
                    Unlocks when every lesson is complete: Take the assessment
                  </div>
                </div>
              </div>
            </Frame>

            {/* Annotations */}
            <div>
              <h3 className="font-serif text-lg font-medium text-ink">
                What each part does
              </h3>
              <div className="mt-4">
                <Annotations
                  items={[
                    {
                      n: 1,
                      text: "Live progress bar. Fills as lessons are marked complete and drives the enrolment status from enrolled to in progress to completed.",
                    },
                    {
                      n: 2,
                      text: "Module and lesson rail. Completed lessons are ticked, the current lesson is highlighted, later modules stay listed but unticked.",
                    },
                    {
                      n: 3,
                      text: "Lesson body. An optional embedded video plus markdown content authored by the board through the admin panel.",
                    },
                    {
                      n: 4,
                      text: "Mark lesson complete. The single action that moves the teacher along the rail and recomputes progress.",
                    },
                    {
                      n: 5,
                      text: "Assessment gate. The link to the exam appears only once all lessons are done.",
                    },
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* EXAM WIREFRAME                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section id="exam-wireframe" className="mt-16 scroll-mt-24">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border border-brass/30 bg-brass-tint text-brass">
            <ListChecks className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">
              2. Assessment / exam
            </h2>
            <p className="text-sm text-muted-foreground">
              Route:{" "}
              <code className="text-ivy-tint">
                /teacher/courses/[id]/assessment
              </code>
            </p>
          </div>
        </div>

        <Card className="glass-strong rounded-2xl">
          <CardContent className="grid gap-8 p-6 lg:grid-cols-[1.55fr_1fr] lg:p-8">
            {/* The wireframe itself */}
            <Frame>
              {/* Exam header */}
              <div className="flex items-center justify-between">
                <Bar w="160px" h={13} />
                <span className="rounded-full border border-dashed border-white/20 px-3 py-1 text-xs text-muted-foreground">
                  Question 3 of 5
                </span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < 2 ? "bg-ivy-tint" : i === 2 ? "bg-ivy/50" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Question card */}
              <div className="glass-inset mt-5 space-y-3 rounded-lg p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-brass">
                  Question 3
                </span>
                <div className="space-y-2">
                  <Bar w="90%" h={11} />
                  <Bar w="60%" h={11} />
                </div>

                {/* Multiple-choice options */}
                <div className="space-y-2.5 pt-2">
                  {[
                    { label: "A", selected: false },
                    { label: "B", selected: true },
                    { label: "C", selected: false },
                    { label: "D", selected: false },
                  ].map((opt) => (
                    <div
                      key={opt.label}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                        opt.selected
                          ? "border-ivy/45 bg-ivy/15"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                          opt.selected
                            ? "border-ivy bg-ivy text-white"
                            : "border-white/25 text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <Bar w={opt.selected ? "70%" : "55%"} h={8} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav + submit */}
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-ivy px-4 py-2 text-xs font-semibold text-white">
                  Next <ArrowRight className="size-3.5" />
                </span>
              </div>

              {/* Pass / result strip */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-dashed border-ivy/40 bg-ivy/10 px-4 py-3 text-xs text-ivy-tint">
                  On a pass (70%+): certificate issued automatically, status set
                  to certified.
                </div>
                <div className="rounded-lg border border-dashed border-clay/40 bg-clay/12 px-4 py-3 text-xs text-[#e3a282]">
                  Below the mark: revisit lessons and retake. No red, just a
                  retry.
                </div>
              </div>
            </Frame>

            {/* Annotations */}
            <div>
              <h3 className="font-serif text-lg font-medium text-ink">
                How the exam works
              </h3>
              <div className="mt-4">
                <Annotations
                  items={[
                    {
                      n: 1,
                      text: "One assessment per course, authored by admin: five multiple-choice questions with a configurable passing score (70% by default).",
                    },
                    {
                      n: 2,
                      text: "Question stepper. The teacher moves through questions one at a time with a clear position indicator.",
                    },
                    {
                      n: 3,
                      text: "Single-select options. The correct answer never reaches the client, scoring runs server-side via a security-definer RPC.",
                    },
                    {
                      n: 4,
                      text: "Submit. A pass issues a certification with a verifiable number (IBVY-YEAR-XXXXXX) and flips the teacher to certified.",
                    },
                    {
                      n: 5,
                      text: "A miss is a retry, not a failure. Warning states use clay, never red, in keeping with the house rules.",
                    },
                  ]}
                />
              </div>
              <div className="glass-inset mt-6 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  Once certified, the teacher appears in the school talent pool
                  with a match indicator and can apply to vacancies. That is the
                  loop closing.
                </p>
                <Button asChild variant="ghost" size="sm" className="mt-3 px-0">
                  <Link href="/teacher/jobs">
                    See matched vacancies <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <div className="glass-inset mt-14 rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          These wireframes mirror the live screens. Try the real flow end to
          end, no sign-in required.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/teacher/courses">Browse courses</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/teacher">Teacher dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
