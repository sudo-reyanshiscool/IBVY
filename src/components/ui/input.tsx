import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm text-ink transition-colors placeholder:text-muted-foreground focus-visible:border-ivy-tint/50 focus-visible:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
