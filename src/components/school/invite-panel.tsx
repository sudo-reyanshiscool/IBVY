"use client";

import { useState, useTransition } from "react";
import { Phone, Lock, CheckCircle2, Send } from "lucide-react";
import { inviteTeacher } from "@/lib/school/actions";
import { Button } from "@/components/ui/button";

/**
 * Invite a teacher to apply. Until invited, contact details stay gated (the
 * brief: phone and resume gated until an application or invite links them).
 * Inviting reveals the contact and flags the application invited_by_school.
 */
export function InvitePanel({
  teacherId,
  phone,
}: {
  teacherId: string;
  phone?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [invited, setInvited] = useState(false);

  return (
    <div className="space-y-4">
      {invited ? (
        <div className="flex items-center gap-2 rounded-md border border-ivy/25 bg-ivy/5 px-3 py-2 text-sm text-ivy">
          <CheckCircle2 className="size-4" /> Invitation sent
        </div>
      ) : (
        <Button
          className="w-full"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await inviteTeacher(teacherId);
              setInvited(true);
            })
          }
        >
          <Send className="size-4" /> Invite to apply
        </Button>
      )}

      <div className="rounded-md border border-line bg-paper-raised p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Contact
        </p>
        {invited ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink">
            <Phone className="size-4 text-ivy" /> {phone ?? "Shared on invite"}
          </p>
        ) : (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="size-4" /> Unlocks when you invite
          </p>
        )}
      </div>
    </div>
  );
}
