import Link from "next/link";
import { Home } from "lucide-react";
import { DashboardShell } from "@/components/shell/dashboard-shell";
import { DemoSwitcher } from "@/components/shell/demo-switcher";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import { DEMO_MODE } from "@/lib/config";
import { getSchools } from "@/lib/data/queries";

export default async function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("school");

  const demoSlot = DEMO_MODE ? (
    <DemoSwitcher
      role="school"
      currentId={profile.id}
      options={getSchools().map((s) => ({
        id: s.id,
        label: `${s.schoolName} (${
          s.schoolType === "transforming" ? "transforming" : "established IB"
        })`,
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
      role="school"
      userName={profile.full_name}
      demoSlot={demoSlot}
      signOutSlot={signOutSlot}
    >
      {children}
    </DashboardShell>
  );
}
