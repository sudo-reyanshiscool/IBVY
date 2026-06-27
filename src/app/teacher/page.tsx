import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";

export default function TeacherDashboard() {
  return (
    <>
      <PageHeading
        title="Your training"
        description="Track course progress, certifications earned, and vacancies matched to your subjects."
      />
      <ComingSoon phase="Arrives in phase 4 to 6">
        Course progress, earned certifications, and recommended vacancies will
        appear here once the learning and hiring rails are built.
      </ComingSoon>
    </>
  );
}
