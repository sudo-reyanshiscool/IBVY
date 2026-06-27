import type { Metadata } from "next";
import { CheckCircle2, XCircle, CalendarDays, User, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/brand/status-pill";
import { VerifyForm } from "@/components/verify/verify-form";
import {
  getCertificationByNumber,
  getTeacher,
  getCourse,
} from "@/lib/data/queries";

export const metadata: Metadata = { title: "Verification result" };

export default async function VerifyResultPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  // Next 16: params is async.
  const { number } = await params;
  const decoded = decodeURIComponent(number);
  const cert = getCertificationByNumber(decoded);
  const teacher = cert ? getTeacher(cert.teacherId) : undefined;
  const course = cert ? getCourse(cert.courseId) : undefined;

  // Note: in the Supabase build this is served by a security-definer function
  // that returns only these public fields, never the certifications table.
  const genuine = Boolean(cert && teacher && course);

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-16">
      {genuine ? (
        <Card className="border-ivy/30">
          <CardContent className="p-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-8 text-ivy" aria-hidden />
              <div>
                <h1 className="font-serif text-2xl font-semibold text-ink">
                  Genuine certificate
                </h1>
                <p className="font-mono text-sm text-brass">
                  {cert!.certificateNumber}
                </p>
              </div>
            </div>

            <dl className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 size-4 text-sage" aria-hidden />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Course
                  </dt>
                  <dd className="text-ink">{course!.title}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="mt-0.5 size-4 text-sage" aria-hidden />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Awarded to
                  </dt>
                  <dd className="text-ink">{teacher!.fullName}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 text-sage" aria-hidden />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Issued
                  </dt>
                  <dd className="text-ink">{cert!.issuedAt}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={cert!.status} />
              </div>
            </dl>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-clay/30">
          <CardContent className="p-8">
            <div className="flex items-center gap-3">
              <XCircle className="size-8 text-clay" aria-hidden />
              <div>
                <h1 className="font-serif text-2xl font-semibold text-ink">
                  No certificate found
                </h1>
                <p className="font-mono text-sm text-muted-foreground">
                  {decoded}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              We could not find a certificate with that number. Check the number
              and try again.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-ink">Verify another</p>
        <VerifyForm initial={decoded} />
      </div>
    </section>
  );
}
