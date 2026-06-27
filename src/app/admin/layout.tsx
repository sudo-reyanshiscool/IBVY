import { DashboardShell } from "@/components/shell/dashboard-shell";

// Phase 1: a placeholder user. Phase 2 wires the authenticated profile and
// enforces role access here and in proxy.ts.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="admin" userName="IBvy Board">
      {children}
    </DashboardShell>
  );
}
