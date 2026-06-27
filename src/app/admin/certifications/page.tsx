import { Award } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { ToggleControl } from "@/components/admin/toggle-control";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/user";
import { CERTIFICATIONS } from "@/lib/mock/data";
import { getTeacher, getCourse } from "@/lib/data/queries";

export default async function AdminCertificationsPage() {
  await requireRole("admin");

  return (
    <>
      <PageHeading
        title="Certifications"
        description="Review issued certifications. Revoke if a certificate must be withdrawn."
      />
      <div className="grid gap-4">
        {CERTIFICATIONS.map((cert) => {
          const teacher = getTeacher(cert.teacherId);
          const course = getCourse(cert.courseId);
          return (
            <Card key={cert.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 items-center justify-center rounded-full bg-brass-tint text-brass">
                    <Award className="size-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-ink">{teacher?.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {course?.title}
                    </p>
                    <p className="font-mono text-xs text-brass">
                      {cert.certificateNumber} · {cert.issuedAt}
                    </p>
                  </div>
                </div>
                <ToggleControl
                  initial={cert.status === "issued"}
                  onLabel="Reinstate"
                  offLabel="Revoke"
                  onBadge="Issued"
                  offBadge="Revoked"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
