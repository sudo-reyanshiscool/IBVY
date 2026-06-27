import { PageHeading } from "@/components/shell/dashboard-shell";
import { ProfileForm } from "@/components/teacher/profile-form";
import { StatusPill } from "@/components/brand/status-pill";
import { requireRole } from "@/lib/auth/user";
import { getTeacher } from "@/lib/data/queries";

export default async function TeacherProfilePage() {
  const profile = await requireRole("teacher");
  const teacher = getTeacher(profile.id);

  if (!teacher) {
    return (
      <PageHeading
        title="Profile"
        description="Your profile is not available."
      />
    );
  }

  return (
    <>
      <PageHeading
        title="Your profile"
        description="Keep your profile current. Schools see this when you apply or are invited."
        action={<StatusPill status={teacher.status} />}
      />
      <ProfileForm teacher={teacher} />
    </>
  );
}
