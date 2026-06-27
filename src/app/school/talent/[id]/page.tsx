import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Award } from "lucide-react";
import { InvitePanel } from "@/components/school/invite-panel";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import {
  getTeacher,
  getCertificationsForTeacher,
  getCourse,
} from "@/lib/data/queries";

export default async function TalentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole("school");
  const { id } = await params;
  const teacher = getTeacher(id);
  if (!teacher) notFound();

  const certs = getCertificationsForTeacher(teacher.id);

  return (
    <>
      <Link
        href="/school/talent"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to talent pool
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 items-center justify-center rounded-full font-serif text-2xl font-semibold text-paper"
              style={{ backgroundColor: teacher.photoColour }}
            >
              {teacher.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-semibold text-ink">
                {teacher.fullName}
              </h1>
              <p className="text-brass">{teacher.subjects.join(", ")}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <StatusPill status={teacher.status} />
            {teacher.city && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" /> {teacher.city}
              </span>
            )}
            <span>{teacher.yearsExperience} years experience</span>
            {teacher.programmes.map((p) => (
              <Badge key={p} variant="secondary">
                {p}
              </Badge>
            ))}
          </div>

          {teacher.bio && (
            <p className="mt-6 text-[15px] leading-relaxed text-ink/90">
              {teacher.bio}
            </p>
          )}

          {teacher.qualifications && (
            <div className="mt-6">
              <h2 className="font-serif text-lg font-semibold text-ink">
                Qualifications
              </h2>
              <p className="mt-1 text-sm text-ink/90">{teacher.qualifications}</p>
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-serif text-lg font-semibold text-ink">
              Certifications
            </h2>
            <div className="mt-3 grid gap-3">
              {certs.map((c) => {
                const course = getCourse(c.courseId);
                return (
                  <Card key={c.id}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <Award className="size-5 text-brass" aria-hidden />
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {course?.title}
                        </p>
                        <p className="font-mono text-xs text-brass">
                          {c.certificateNumber}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <aside>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
                Recruit
              </h2>
              <InvitePanel teacherId={teacher.id} phone={teacher.phone} />
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}
