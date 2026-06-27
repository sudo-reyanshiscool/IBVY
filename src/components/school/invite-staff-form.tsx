"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, UserPlus } from "lucide-react";
import { inviteStaff } from "@/lib/school/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InviteStaffForm() {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    startTransition(async () => {
      await inviteStaff(email, name);
      setSent(name || email);
      setName("");
      setEmail("");
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="staff-name">Name</Label>
          <Input
            id="staff-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Staff member name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="staff-email">Email</Label>
          <Input
            id="staff-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@school.example.in"
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          <UserPlus className="size-4" /> Send invitation
        </Button>
        {sent && (
          <span className="inline-flex items-center gap-1.5 text-sm text-ivy">
            <CheckCircle2 className="size-4" /> Invited {sent}
          </span>
        )}
      </div>
    </form>
  );
}
