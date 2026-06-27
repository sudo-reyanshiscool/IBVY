"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VerifyForm({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = value.trim();
    if (num) router.push(`/verify/${encodeURIComponent(num)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="IBVY-2026-XXXXXX"
        className="font-mono uppercase"
        aria-label="Certificate number"
      />
      <Button type="submit" size="lg" className="shrink-0">
        <Search className="size-4" /> Verify
      </Button>
    </form>
  );
}
