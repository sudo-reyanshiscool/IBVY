import Link from "next/link";
import { Home } from "lucide-react";
import { DashboardShell } from "@/components/shell/dashboard-shell";
import { DemoSwitcher } from "@/components/shell/demo-switcher";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/user";
import { DEMO_MODE } from "@/lib/config";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("admin");

  const demoSlot = DEMO_MODE ? (
    <DemoSwitcher role="admin" currentId="admin" options={[]} />
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
      role="admin"
      userName={profile.full_name}
      demoSlot={demoSlot}
      signOutSlot={signOutSlot}
    >
      {children}
    </DashboardShell>
  );
}
