import Link from "next/link";
import { Home } from "lucide-react";
import { DashboardShell } from "@/components/shell/dashboard-shell";
import { DemoSwitcher } from "@/components/shell/demo-switcher";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import { DEMO_MODE } from "@/lib/config";
import { getTeachers } from "@/lib/data/queries";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("teacher");

  const demoSlot = DEMO_MODE ? (
    <DemoSwitcher
      role="teacher"
      currentId={profile.id}
      options={getTeachers().map((t) => ({
        id: t.id,
        label: `${t.fullName} (${t.status.replace(/_/g, " ")})`,
      }))}
    />
  ) : undefined;

  const signOutSlot = DEMO_MODE ? (
    <Button asChild variant="ghost" size="icon" title="Back to site">
      <Link href="/">
        <Home className="size-4" />
      </Link>
    </Button>
  ) : (
    <SignOutButton />
  );

  return (
    <DashboardShell
      role="teacher"
      userName={profile.full_name}
      demoSlot={demoSlot}
      signOutSlot={signOutSlot}
    >
      {children}
    </DashboardShell>
  );
}
