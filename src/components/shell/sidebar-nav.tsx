"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, type Role } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** The role-aware navigation links, with an active state from the pathname. */
export function SidebarNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = NAV[role];

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {items.map((item) => {
        const active =
          item.href === `/${role}`
            ? pathname === item.href
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
