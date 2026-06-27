import { PageHeading } from "@/components/shell/dashboard-shell";
import { TalentBrowser, type TalentRow } from "@/components/school/talent-browser";
import { requireRole } from "@/lib/auth/user";
import {
  getCertifiedTeachers,
  getVacanciesForSchool,
  matchTeacherToVacancy,
} from "@/lib/data/queries";
import type { MatchResult } from "@/lib/match";

export default async function SchoolTalentPage() {
  const profile = await requireRole("school");
  const vacancies = getVacanciesForSchool(profile.id).filter(
    (v) => v.status === "open",
  );

  const talent: TalentRow[] = getCertifiedTeachers().map((t) => {
    // Best match across the school's open vacancies.
    let best: MatchResult = { level: "weak", label: "Certified", score: 0 };
    for (const v of vacancies) {
      const m = matchTeacherToVacancy(t, v);
      if (m.score > best.score) best = m;
    }
    return {
      id: t.id,
      name: t.fullName,
      subjects: t.subjects,
      city: t.city,
      yearsExperience: t.yearsExperience,
      programmes: t.programmes,
      status: t.status,
      match: { level: best.level, label: best.label },
    };
  });

  return (
    <>
      <PageHeading
        title="Talent pool"
        description="Board-certified teachers, with a match indicator against your open vacancies. Contact details unlock once you invite or they apply."
      />
      <TalentBrowser talent={talent} />
    </>
  );
}
