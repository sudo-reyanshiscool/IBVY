"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEMO_TEACHER_COOKIE,
  DEMO_SCHOOL_COOKIE,
} from "@/lib/demo/session";

const COOKIE_OPTS = { path: "/", maxAge: 60 * 60 * 24 * 30 };

/** Switch which teacher the prototype is browsing as. */
export async function actAsTeacher(teacherId: string) {
  const store = await cookies();
  store.set(DEMO_TEACHER_COOKIE, teacherId, COOKIE_OPTS);
  redirect("/teacher");
}

/** Switch which school the prototype is browsing as. */
export async function actAsSchool(schoolId: string) {
  const store = await cookies();
  store.set(DEMO_SCHOOL_COOKIE, schoolId, COOKIE_OPTS);
  redirect("/school");
}
