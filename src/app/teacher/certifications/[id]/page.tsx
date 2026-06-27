import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PrintButton } from "@/components/brand/print-button";
import { requireRole } from "@/lib/auth/user";
import { getCertification, getCourse, getTeacher } from "@/lib/data/queries";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireRole("teacher");
  const { id } = await params;
  const cert = getCertification(id);
  if (!cert || cert.teacherId !== profile.id) notFound();

  const course = getCourse(cert.courseId);
  const teacher = getTeacher(cert.teacherId);

  return (
    <>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/teacher/certifications"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
        >
          <ArrowLeft className="size-4" /> Back to certifications
        </Link>
        <PrintButton />
      </div>

      {/* The certificate */}
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-lg border-2 border-brass/40 bg-paper-raised p-10 text-center shadow-sm sm:p-14">
          <div className="pointer-events-none absolute inset-3 rounded border border-brass/20" />
          <p className="font-serif text-2xl font-semibold tracking-tight text-ivy">
            IB<span className="text-brass">vy</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Certificate of completion
          </p>

          <p className="mt-10 text-sm text-muted-foreground">
            This certifies that
          </p>
          <p className="mt-2 font-serif text-3xl font-semibold text-ink">
            {teacher?.fullName}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            has successfully completed and passed
          </p>
          <p className="mx-auto mt-2 max-w-xl font-serif text-xl font-semibold text-ivy">
            {course?.title}
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-brass">
            <ShieldCheck className="size-5" aria-hidden />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-1">
            <p className="font-mono text-sm text-brass">
              {cert.certificateNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Issued {cert.issuedAt} · Verify at /verify
            </p>
          </div>

          <p className="mt-8 text-xs italic text-muted-foreground">
            Designed and awarded by the IBvy educator board.
          </p>
        </div>
      </div>
    </>
  );
}
