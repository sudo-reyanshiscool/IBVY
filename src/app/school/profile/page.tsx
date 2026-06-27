import { PageHeading } from "@/components/shell/dashboard-shell";
import { SchoolProfileForm } from "@/components/school/school-profile-form";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import { getSchool } from "@/lib/data/queries";

export default async function SchoolProfilePage() {
  const profile = await requireRole("school");
  const school = getSchool(profile.id);

  if (!school) {
    return <PageHeading title="School profile" description="Not available." />;
  }

  return (
    <>
      <PageHeading
        title="School profile"
        description="Your school details, type, and logo. Verification is a trust badge shown to teachers."
        action={
          <Badge variant={school.verified ? "brass" : "outline"}>
            {school.verified ? "Verified" : "Awaiting verification"}
          </Badge>
        }
      />
      <SchoolProfileForm school={school} />
    </>
  );
}
