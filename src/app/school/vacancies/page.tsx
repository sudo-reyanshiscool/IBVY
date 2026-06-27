import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";
import { StatusPill } from "@/components/brand/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import {
  getVacanciesForSchool,
  getApplicationsForVacancy,
} from "@/lib/data/queries";

export default async function SchoolVacanciesPage() {
  const profile = await requireRole("school");
  const vacancies = getVacanciesForSchool(profile.id);

  return (
    <>
      <PageHeading
        title="Vacancies"
        description="Post roles and manage the applicant pipeline for each."
        action={
          <Button asChild>
            <Link href="/school/vacancies/new">
              <Plus className="size-4" /> Create vacancy
            </Link>
          </Button>
        }
      />

      {vacancies.length === 0 ? (
        <ComingSoon phase="Post your first vacancy">
          Create a vacancy to start receiving applications from the certified
          talent pool.
        </ComingSoon>
      ) : (
        <div className="grid gap-4">
          {vacancies.map((v) => {
            const apps = getApplicationsForVacancy(v.id);
            return (
              <Card key={v.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/school/vacancies/${v.id}`}
                        className="font-serif text-lg font-semibold text-ink hover:text-ivy"
                      >
                        {v.title}
                      </Link>
                      {v.programme && <Badge variant="secondary">{v.programme}</Badge>}
                    </div>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="size-3.5" /> {apps.length} applicant
                      {apps.length === 1 ? "" : "s"} · {v.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={v.status} />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/school/vacancies/${v.id}`}>
                        View pipeline
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
