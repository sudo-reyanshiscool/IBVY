import { Wordmark } from "@/components/brand/wordmark";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { ROLE_LABEL, type Role } from "@/lib/nav";

/**
 * The shared dashboard shell: a deep ivy sidebar (role-aware nav), a top bar
 * carrying the signed-in user's name and role, and a content area on paper.
 * In phase 1 the user is passed in by the role layouts; phase 2 wires the
 * real authenticated user and a working sign-out.
 */
export function DashboardShell({
  role,
  userName,
  children,
  signOutSlot,
  demoSlot,
}: {
  role: Role;
  userName: string;
  children: React.ReactNode;
  signOutSlot?: React.ReactNode;
  demoSlot?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh bg-paper">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar md:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Wordmark tone="dark" href={`/${role}`} />
        </div>
        <SidebarNav role={role} />
        <div className="border-t border-sidebar-border px-6 py-4">
          <p className="text-xs uppercase tracking-wide text-sidebar-foreground/50">
            {ROLE_LABEL[role]} workspace
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-line bg-paper-raised px-6">
          <div className="md:hidden">
            <Wordmark href={`/${role}`} />
          </div>
          <div className="ml-auto flex items-center gap-3">
            {demoSlot}
            <div className="text-right">
              <p className="text-sm font-medium leading-tight text-ink">
                {userName}
              </p>
              <p className="text-xs leading-tight text-muted-foreground">
                {ROLE_LABEL[role]}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-ivy text-sm font-semibold text-paper">
              {userName.charAt(0).toUpperCase()}
            </div>
            {signOutSlot}
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <div className="mx-auto w-full max-w-6xl animate-fade-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/** Standard page heading used inside the shell. */
export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
