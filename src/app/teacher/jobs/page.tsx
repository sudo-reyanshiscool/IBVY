import { PageHeading } from "@/components/shell/dashboard-shell";
import { JobsBrowser, type JobRow } from "@/components/jobs/jobs-browser";
import { requireRole } from "@/lib/auth/user";
import {
  getTeacher,
  getOpenVacancies,
  getSchool,
  matchTeacherToVacancy,
} from "@/lib/data/queries";

export default async function TeacherJobsPage() {
  const profile = await requireRole("teacher");
  const teacher = getTeacher(profile.id);

  const jobs: JobRow[] = getOpenVacancies()
    .map((v) => {
      const match = teacher
        ? matchTeacherToVacancy(teacher, v)
        : { level: "weak" as const, label: "Possible match" };
      return {
        id: v.id,
        title: v.title,
        subject: v.subject,
        programme: v.programme,
        location: v.location,
        salaryRange: v.salaryRange,
        schoolName: getSchool(v.schoolId)?.schoolName ?? "School",
        match: { level: match.level, label: match.label },
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <PageHeading
        title="Open vacancies"
        description="Roles at vetted IB schools, with a match indicator against your subjects and programmes."
      />
      <JobsBrowser jobs={jobs} />
    </>
  );
}
