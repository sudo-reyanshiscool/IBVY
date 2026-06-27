import { DashboardShell } from "@/components/shell/dashboard-shell";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { requireRole } from "@/lib/auth/user";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("teacher");
  return (
    <DashboardShell
      role="teacher"
      userName={profile.full_name}
      signOutSlot={<SignOutButton />}
    >
      {children}
    </DashboardShell>
  );
}
