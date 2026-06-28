import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { SITE_NAME } from "@/lib/constants";

const COLUMNS = [
  {
    title: "For teachers",
    links: [
      { href: "/become-ib", label: "Become IB" },
      { href: "/courses", label: "Browse courses" },
      { href: "/verify", label: "Verify a certificate" },
    ],
  },
  {
    title: "For schools",
    links: [
      { href: "/hiring", label: "Fill the room" },
      { href: "/transform", label: "Transform to IB" },
      { href: "/the-board", label: "The educator board" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/teacher", label: "Teacher workspace" },
      { href: "/school", label: "School workspace" },
      { href: "/admin", label: "Admin workspace" },
      { href: "/wireframes", label: "Course & exam wireframes" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="glass-bar border-t border-glass-edge">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The engine that sources, trains, certifies and places IB teachers
              inside India&rsquo;s international schools.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-ivy"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-6 text-sm text-muted-foreground">
          &copy; 2026 {SITE_NAME}. Built for India&rsquo;s IB schools.
        </div>
      </div>
    </footer>
  );
}
