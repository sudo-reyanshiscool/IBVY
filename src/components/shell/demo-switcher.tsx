"use client";

import { useTransition } from "react";
import { FlaskConical } from "lucide-react";
import { actAsTeacher, actAsSchool } from "@/lib/demo/actions";
import type { Role } from "@/lib/nav";

/**
 * Prototype-only control: switch which teacher or school you are browsing as,
 * so a demo can show every state of the product without signing in.
 */
export function DemoSwitcher({
  role,
  currentId,
  options,
}: {
  role: Role;
  currentId: string;
  options: { id: string; label: string }[];
}) {
  const [pending, startTransition] = useTransition();

  if (role === "admin" || options.length === 0) {
    return (
      <span className="hidden items-center gap-1.5 rounded-full border border-brass/30 bg-brass-tint px-2.5 py-1 text-xs font-medium text-brass sm:inline-flex">
        <FlaskConical className="size-3.5" aria-hidden />
        Demo
      </span>
    );
  }

  const onChange = (id: string) => {
    startTransition(() => {
      if (role === "teacher") actAsTeacher(id);
      else actAsSchool(id);
    });
  };

  return (
    <label className="hidden items-center gap-2 rounded-full border border-brass/30 bg-brass-tint px-2.5 py-1 text-xs font-medium text-brass sm:inline-flex">
      <FlaskConical className="size-3.5" aria-hidden />
      <span className="sr-only">Demo: act as</span>
      <span aria-hidden>Act as</span>
      <select
        value={currentId}
        disabled={pending}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-[11rem] truncate bg-transparent font-semibold text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
