import { PageHeading } from "@/components/shell/dashboard-shell";
import { StatusPill } from "@/components/brand/status-pill";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/user";
import { getTeachers, getSchools } from "@/lib/data/queries";

export default async function AdminUsersPage() {
  await requireRole("admin");
  const teachers = getTeachers();
  const schools = getSchools();

  return (
    <>
      <PageHeading
        title="Users"
        description="Every teacher and school on the platform."
      />

      <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
        Teachers ({teachers.length})
      </h2>
      <div className="mb-10 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Subjects</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {teachers.map((t) => (
              <tr key={t.id} className="bg-paper-raised">
                <td className="px-4 py-3 font-medium text-ink">{t.fullName}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {t.subjects.join(", ")}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{t.city}</td>
                <td className="px-4 py-3">
                  <StatusPill status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
        Schools ({schools.length})
      </h2>
      <div className="overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sage-soft/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">School</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">Verified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {schools.map((s) => (
              <tr key={s.id} className="bg-paper-raised">
                <td className="px-4 py-3 font-medium text-ink">
                  {s.schoolName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {s.schoolType === "transforming"
                    ? "Transforming"
                    : "Established IB"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.city}</td>
                <td className="px-4 py-3">
                  <Badge variant={s.verified ? "brass" : "outline"}>
                    {s.verified ? "Verified" : "Unverified"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
