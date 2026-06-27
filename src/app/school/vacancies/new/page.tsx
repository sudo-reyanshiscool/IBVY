import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeading } from "@/components/shell/dashboard-shell";
import { VacancyForm } from "@/components/school/vacancy-form";
import { requireRole } from "@/lib/auth/user";

export default async function NewVacancyPage() {
  await requireRole("school");
  return (
    <>
      <Link
        href="/school/vacancies"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ivy"
      >
        <ArrowLeft className="size-4" /> Back to vacancies
      </Link>
      <PageHeading
        title="Create a vacancy"
        description="Post a role to the certified talent pool."
      />
      <VacancyForm />
    </>
  );
}
