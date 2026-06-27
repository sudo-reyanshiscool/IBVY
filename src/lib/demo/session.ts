import { cookies } from "next/headers";
import { getTeacher, getSchool } from "@/lib/data/queries";
import type { Role } from "@/lib/nav";

/**
 * Demo "act as" selection. In prototype mode there is no real auth, so the
 * demoer browses as a chosen teacher or school (stored in a cookie) to show
 * every angle of the product. Defaults pick a representative actor per role.
 */
export const DEMO_TEACHER_COOKIE = "ibvy_demo_teacher";
export const DEMO_SCHOOL_COOKIE = "ibvy_demo_school";
export const DEFAULT_DEMO_TEACHER = "t-priya";
export const DEFAULT_DEMO_SCHOOL = "s-heritage";

export async function getDemoTeacherId(): Promise<string> {
  const store = await cookies();
  return store.get(DEMO_TEACHER_COOKIE)?.value ?? DEFAULT_DEMO_TEACHER;
}

export async function getDemoSchoolId(): Promise<string> {
  const store = await cookies();
  return store.get(DEMO_SCHOOL_COOKIE)?.value ?? DEFAULT_DEMO_SCHOOL;
}

export interface DemoActor {
  id: string;
  fullName: string;
}

/** Resolve the demo actor (id + display name) for a role. */
export async function getDemoActor(role: Role): Promise<DemoActor> {
  if (role === "teacher") {
    const id = await getDemoTeacherId();
    const teacher = getTeacher(id) ?? getTeacher(DEFAULT_DEMO_TEACHER)!;
    return { id: teacher.id, fullName: teacher.fullName };
  }
  if (role === "school") {
    const id = await getDemoSchoolId();
    const school = getSchool(id) ?? getSchool(DEFAULT_DEMO_SCHOOL)!;
    return { id: school.id, fullName: school.contactName ?? school.schoolName };
  }
  return { id: "admin", fullName: "IBvy Board" };
}
