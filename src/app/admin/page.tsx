import { PageHeading } from "@/components/shell/dashboard-shell";
import { ComingSoon } from "@/components/shell/coming-soon";

export default function AdminDashboard() {
  return (
    <>
      <PageHeading
        title="Platform overview"
        description="Supply and demand at a glance: teachers in training and certified, placements, fill rate, and the fee pipeline."
      />
      <ComingSoon phase="Arrives in phase 7">
        Metrics and editorial charts will appear here once seed data and the
        full loop are in place. Course authoring, certifications, schools,
        placements, and leads are built across phases 4 to 6.
      </ComingSoon>
    </>
  );
}
