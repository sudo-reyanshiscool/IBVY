"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { GraduationCap, Building2 } from "lucide-react";
import { signUpSchema, type SignUpValues } from "@/lib/auth/schemas";
import { signUpAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    value: "teacher" as const,
    title: "I am a teacher",
    blurb: "Train, certify, and get placed in an IB school.",
    icon: GraduationCap,
  },
  {
    value: "school" as const,
    title: "I am a school",
    blurb: "Hire certified teachers or upskill your own staff.",
    icon: Building2,
  },
];

export function SignUpForm() {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "teacher" },
  });

  const role = watch("role");

  const onSubmit = (values: SignUpValues) => {
    setFormError(null);
    setMessage(null);
    const fd = new FormData();
    fd.set("fullName", values.fullName);
    fd.set("email", values.email);
    fd.set("password", values.password);
    fd.set("role", values.role);
    startTransition(async () => {
      // A confirmed sign-up redirects server-side; otherwise we get a message.
      const result = await signUpAction(fd);
      if (result?.error) setFormError(result.error);
      if (result?.message) setMessage(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Role selection */}
      <div className="space-y-2">
        <Label>I am joining as</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const selected = role === r.value;
            return (
              <button
                type="button"
                key={r.value}
                onClick={() =>
                  setValue("role", r.value, { shouldValidate: true })
                }
                aria-pressed={selected}
                className={cn(
                  "flex flex-col gap-2 rounded-lg border p-4 text-left transition-colors",
                  selected
                    ? "border-ivy bg-ivy/5 ring-1 ring-ivy"
                    : "border-line bg-paper-raised hover:border-sage",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    selected ? "text-ivy" : "text-sage",
                  )}
                  aria-hidden
                />
                <span className="text-sm font-medium text-ink">{r.title}</span>
                <span className="text-xs text-muted-foreground">{r.blurb}</span>
              </button>
            );
          })}
        </div>
        {errors.role && (
          <p className="text-sm text-clay">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" autoComplete="name" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-clay">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-clay">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-clay">{errors.password.message}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            At least 8 characters.
          </p>
        )}
      </div>

      {formError && (
        <p className="rounded-md bg-clay/10 px-3 py-2 text-sm text-clay">
          {formError}
        </p>
      )}
      {message && (
        <p className="rounded-md bg-ivy/10 px-3 py-2 text-sm text-ivy">
          {message}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ivy hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
