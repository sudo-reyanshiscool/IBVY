import { cn } from "@/lib/utils";

/**
 * Editorial status pills across every lifecycle (enrolment, teacher, vacancy,
 * application, fee, certification). Muted ivy / brass / sage tones; clay only
 * for negative or withdrawn states. Never bright, never red.
 */
type Tone = "ivy" | "brass" | "sage" | "clay" | "neutral";

const toneClasses: Record<Tone, string> = {
  ivy: "bg-ivy/18 text-[#5fd3a6] border-ivy/35",
  brass: "bg-brass-tint text-brass border-brass/35",
  sage: "bg-white/8 text-[#aebfb6] border-white/14",
  clay: "bg-clay/18 text-[#e3a282] border-clay/35",
  neutral: "bg-white/5 text-muted-foreground border-white/12",
};

/** Map every status string the platform uses to a tone and a readable label. */
const STATUS_MAP: Record<string, { tone: Tone; label: string }> = {
  // Enrolment
  enrolled: { tone: "sage", label: "Enrolled" },
  in_progress: { tone: "sage", label: "In progress" },
  completed: { tone: "ivy", label: "Completed" },
  // Teacher
  training: { tone: "sage", label: "In training" },
  certified: { tone: "brass", label: "Certified" },
  placed: { tone: "ivy", label: "Placed" },
  open_to_offers: { tone: "ivy", label: "Open to offers" },
  // Vacancy
  open: { tone: "ivy", label: "Open" },
  filled: { tone: "brass", label: "Filled" },
  closed: { tone: "neutral", label: "Closed" },
  // Application
  applied: { tone: "sage", label: "Applied" },
  shortlisted: { tone: "ivy", label: "Shortlisted" },
  interview: { tone: "ivy", label: "Interview" },
  offered: { tone: "brass", label: "Offered" },
  hired: { tone: "ivy", label: "Hired" },
  rejected: { tone: "clay", label: "Not selected" },
  withdrawn: { tone: "clay", label: "Withdrawn" },
  // Fee
  pending: { tone: "sage", label: "Pending" },
  invoiced: { tone: "brass", label: "Invoiced" },
  paid: { tone: "ivy", label: "Paid" },
  // Certification
  issued: { tone: "brass", label: "Issued" },
  revoked: { tone: "clay", label: "Revoked" },
  // Invitation / lead
  accepted: { tone: "ivy", label: "Accepted" },
  expired: { tone: "neutral", label: "Expired" },
  new: { tone: "sage", label: "New" },
  contacted: { tone: "brass", label: "Contacted" },
  converted: { tone: "ivy", label: "Converted" },
};

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const entry = STATUS_MAP[status] ?? {
    tone: "neutral" as Tone,
    label: status,
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[entry.tone],
        className,
      )}
    >
      {entry.label}
    </span>
  );
}
