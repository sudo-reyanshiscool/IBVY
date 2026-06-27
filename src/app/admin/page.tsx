import {
  GraduationCap,
  Award,
  BadgeCheck,
  Briefcase,
  Percent,
} from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { StatCard } from "@/components/brand/stat-card";
import { SupplyChart, FeePipelineChart } from "@/components/admin/admin-charts";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/user";
import { platformMetrics, formatINR } from "@/lib/data/queries";

export default async function AdminDashboard() {
  await requireRole("admin");
  const m = platformMetrics();

  const supplyData = [
    { stage: "Training", count: m.inTraining },
    { stage: "Certified", count: m.certified },
    { stage: "Placed", count: m.placed },
  ];
  const feeData = [
    { name: "Pending", value: m.feePipeline.pending },
    { name: "Invoiced", value: m.feePipeline.invoiced },
    { name: "Paid", value: m.feePipeline.paid },
  ];

  return (
    <>
      <PageHeading
        title="Platform overview"
        description="Supply and demand at a glance: training, certification, placements, and the fee pipeline."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="In training" value={m.inTraining} icon={GraduationCap} />
        <StatCard label="Certified" value={m.certified} icon={Award} />
        <StatCard label="Placed" value={m.placed} icon={BadgeCheck} />
        <StatCard label="Placements" value={m.placements} icon={Briefcase} />
        <StatCard label="Fill rate" value={`${m.fillRate}%`} icon={Percent} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
              Supply funnel
            </h2>
            <SupplyChart data={supplyData} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-1 font-serif text-lg font-semibold text-ink">
              Fee pipeline
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Paid to date: {formatINR(m.feePipeline.paid)}
            </p>
            <FeePipelineChart data={feeData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
