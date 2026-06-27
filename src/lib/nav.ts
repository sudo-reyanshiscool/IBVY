import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Briefcase,
  FileText,
  User,
  Building2,
  Users,
  GraduationCap,
  BadgeCheck,
  Receipt,
  Inbox,
  School,
} from "lucide-react";

export type Role = "teacher" | "school" | "admin";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Role-aware navigation, mapped to the routes in the brief, section 7. */
export const NAV: Record<Role, NavItem[]> = {
  teacher: [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/courses", label: "My courses", icon: BookOpen },
    { href: "/teacher/certifications", label: "Certifications", icon: Award },
    { href: "/teacher/jobs", label: "Jobs", icon: Briefcase },
    { href: "/teacher/applications", label: "Applications", icon: FileText },
    { href: "/teacher/profile", label: "Profile", icon: User },
  ],
  school: [
    { href: "/school", label: "Dashboard", icon: LayoutDashboard },
    { href: "/school/vacancies", label: "Vacancies", icon: Briefcase },
    { href: "/school/talent", label: "Talent pool", icon: Users },
    { href: "/school/staff", label: "Staff training", icon: GraduationCap },
    { href: "/school/placements", label: "Placements", icon: BadgeCheck },
    { href: "/school/profile", label: "Profile", icon: Building2 },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/certifications", label: "Certifications", icon: Award },
    { href: "/admin/schools", label: "Schools", icon: School },
    { href: "/admin/placements", label: "Placements", icon: Receipt },
    { href: "/admin/leads", label: "Pilot leads", icon: Inbox },
    { href: "/admin/users", label: "Users", icon: Users },
  ],
};

export const ROLE_LABEL: Record<Role, string> = {
  teacher: "Teacher",
  school: "School",
  admin: "Admin",
};
