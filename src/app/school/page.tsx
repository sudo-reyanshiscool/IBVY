import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";

export default function SchoolDashboard() {
  return (
    <>
      <PageHeading
        title="Your school"
        description="Active vacancies, applicant pipeline, placements and fees, and staff in training."
      />
      <ComingSoon phase="Arrives in phase 6">
        Hiring (for established IB schools) and staff training (for transforming
        schools) will appear here once vacancies, the talent pool, and the staff
        rail are built.
      </ComingSoon>
    </>
  );
}
