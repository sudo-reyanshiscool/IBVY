import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-ivy-tint to-ivy text-white shadow-[0_8px_20px_-8px_rgba(12,110,87,0.6)] hover:shadow-[0_12px_26px_-8px_rgba(12,110,87,0.7)] hover:-translate-y-0.5",
        secondary:
          "bg-white/55 text-ink backdrop-blur-md border border-glass-edge hover:bg-white/75",
        outline:
          "border border-white/70 bg-white/30 text-ink backdrop-blur-md hover:bg-white/55",
        ghost: "text-ink hover:bg-white/50",
        brass:
          "bg-gradient-to-br from-[#caa14e] to-brass text-white shadow-[0_8px_20px_-8px_rgba(177,132,46,0.6)] hover:-translate-y-0.5",
        // Destructive uses clay, never red, per the house rules.
        destructive: "bg-clay text-white hover:bg-clay/90",
        link: "text-ivy underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
