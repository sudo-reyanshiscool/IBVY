import Link from "next/link";
import { Award, ExternalLink } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import { getCertificationsForTeacher, getCourse } from "@/lib/data/queries";

export default async function CertificationsPage() {
  const profile = await requireRole("teacher");
  const certs = getCertificationsForTeacher(profile.id);

  return (
    <>
      <PageHeading
        title="Certifications"
        description="Your earned certificates. Each carries a verifiable number that schools can check."
      />

      {certs.length === 0 ? (
        <ComingSoon phase="Earn your first certificate">
          Complete a course and pass its assessment to earn a verifiable IBvy
          certificate. It will appear here.
        </ComingSoon>
      ) : (
        <div className="grid gap-4">
          {certs.map((cert) => {
            const course = getCourse(cert.courseId);
            return (
              <Card key={cert.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-brass-tint text-brass">
                      <Award className="size-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-ink">
                        {course?.title}
                      </h3>
                      <p className="font-mono text-sm text-brass">
                        {cert.certificateNumber}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Issued {cert.issuedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={cert.status} />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/teacher/certifications/${cert.id}`}>
                        View certificate <ExternalLink className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
