import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { VerifyForm } from "@/components/verify/verify-form";

export const metadata: Metadata = {
  title: "Verify a certificate",
  description:
    "Confirm that an IBvy certificate is genuine. Enter the certificate number.",
};

export default function VerifyPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-ivy text-paper">
          <ShieldCheck className="size-6" aria-hidden />
        </div>
        <h1 className="mt-5 font-serif text-4xl font-semibold text-ink">
          Verify a certificate
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Enter an IBvy certificate number to confirm it is genuine, with the
          course, teacher, and issue date.
        </p>
      </div>
      <div className="mt-8">
        <VerifyForm />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Try IBVY-2026-7K2M9A from the seeded demo data.
      </p>
    </section>
  );
}
