"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { pilotLeadSchema, type PilotLeadValues } from "@/lib/marketing/pilot";
import { submitPilotLead } from "@/lib/marketing/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PilotForm({
  defaultSchoolType,
}: {
  defaultSchoolType?: "established_ib" | "transforming";
}) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PilotLeadValues>({
    resolver: zodResolver(pilotLeadSchema),
    defaultValues: { schoolType: defaultSchoolType },
  });

  const onSubmit = (values: PilotLeadValues) => {
    setError(null);
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v) fd.set(k, String(v));
    });
    startTransition(async () => {
      const res = await submitPilotLead(fd);
      if (res.error) setError(res.error);
      else setDone(true);
    });
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-ivy/20 bg-ivy/5 p-8 text-center">
        <CheckCircle2 className="size-8 text-ivy" aria-hidden />
        <h3 className="font-serif text-xl font-semibold text-ink">
          Thank you. We will be in touch.
        </h3>
        <p className="text-sm text-muted-foreground">
          Our team will reach out to arrange your pilot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        type="hidden"
        {...register("schoolType")}
        value={defaultSchoolType}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schoolName">School name</Label>
          <Input id="schoolName" {...register("schoolName")} />
          {errors.schoolName && (
            <p className="text-sm text-clay">{errors.schoolName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact name</Label>
          <Input id="contactName" {...register("contactName")} />
          {errors.contactName && (
            <p className="text-sm text-clay">{errors.contactName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-clay">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City (optional)</Label>
          <Input id="city" {...register("city")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help? (optional)</Label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="flex w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm text-ink shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {error && (
        <p className="rounded-md bg-clay/10 px-3 py-2 text-sm text-clay">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending..." : "Request a pilot"}
      </Button>
    </form>
  );
}
