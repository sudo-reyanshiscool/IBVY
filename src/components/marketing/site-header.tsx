import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/become-ib", label: "Become IB" },
  { href: "/hiring", label: "Fill the room" },
  { href: "/transform", label: "Transform to IB" },
  { href: "/courses", label: "Courses" },
  { href: "/wireframes", label: "Wireframes" },
  { href: "/verify", label: "Verify" },
];

export function SiteHeader() {
  return (
    <header className="glass-bar sticky top-0 z-30 border-b border-glass-edge">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/75 transition-colors hover:text-ivy"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        {/* No sign-in needed: step straight into any workspace. */}
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/teacher">Teacher</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/school">Enter the app</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
