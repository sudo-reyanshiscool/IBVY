import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-white/40 bg-ivy/90 text-white backdrop-blur-sm",
        secondary: "border-white/50 bg-white/55 text-ink backdrop-blur-sm",
        brass:
          "border-[#caa14e]/40 bg-brass-tint text-[#7a5b1e] backdrop-blur-sm",
        outline: "border-white/60 bg-white/30 text-ink backdrop-blur-sm",
        // Negative / withdrawn states use clay, never red.
        clay: "border-clay/25 bg-clay/12 text-clay backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
