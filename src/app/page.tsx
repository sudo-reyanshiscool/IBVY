import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_NAME, SITE_TAGLINE, MARKETING_DOORS } from "@/lib/constants";

// Phase 1 scaffold home. The full editorial landing with the three-step engine
// and the educator board is built in phase 7.
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 items-center justify-between border-b border-line px-6">
        <Wordmark />
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-20 text-center">
          <Badge variant="brass" className="mb-6">
            India-first IB teacher engine
          </Badge>
          <h1 className="mx-auto max-w-3xl font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            Source, train, certify, and place IB teachers.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {SITE_NAME} is read as IB plus ivy: {SITE_TAGLINE.toLowerCase()}. We
            keep qualified teachers inside India&rsquo;s own international schools
            rather than exporting them abroad.
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

        {/* The three doors */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-20">
          <div className="grid gap-5 sm:grid-cols-3">
            {MARKETING_DOORS.map((door) => (
              <Card key={door.href} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-brass">
                    {door.audience}
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-ink">
                    {door.title}
                  </h2>
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

      </main>

      <footer className="border-t border-line px-6 py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <Wordmark />
          <p>
            &copy; 2026 {SITE_NAME}. Built for India&rsquo;s IB schools.
          </p>
        </div>
      </footer>
    </div>
  );
}
