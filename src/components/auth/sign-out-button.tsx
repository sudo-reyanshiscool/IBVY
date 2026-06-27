"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      title="Sign out"
      aria-label="Sign out"
      disabled={pending}
      onClick={() => startTransition(() => signOutAction())}
    >
      <LogOut className="size-4" />
    </Button>
  );
}
