import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The IBvy logotype. Serif, with the "vy" lifted in brass to carry the
 * IB-plus-ivy idea. `tone` flips it for dark (ivy sidebar) vs light surfaces.
 */
export function Wordmark({
  href = "/",
  tone = "light",
  className,
}: {
  href?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-serif text-2xl font-semibold tracking-tight",
        tone === "dark" ? "text-paper" : "text-ivy",
        className,
      )}
    >
      IB<span className="text-brass">vy</span>
      <span className="sr-only"> {SITE_NAME} home</span>
    </Link>
  );
}
