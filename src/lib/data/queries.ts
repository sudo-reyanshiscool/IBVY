/**
 * Data-access layer for IBvy. In the prototype this reads the seeded mock
 * dataset. It is the single seam where Supabase queries slot in later: every
 * screen calls these functions, never a data source directly.
 */
import {
  COURSES,
  TEACHERS,
  SCHOOLS,
  ENROLMENTS,
  CERTIFICATIONS,
  VACANCIES,
  APPLICATIONS,
  PLACEMENTS,
  STAFF_INVITATIONS,
  PILOT_LEADS,
} from "@/lib/mock/data";
import { scoreMatch, type MatchResult } from "@/lib/match";
import type {
  Course,
  Teacher,
  School,
  Enrolment,
  Vacancy,
} from "@/lib/types";

// --- Courses ---------------------------------------------------------------
export const getCourses = () => COURSES;
export const getPublishedCourses = () => COURSES.filter((c) => c.published);
export const getCourse = (id: string) => COURSES.find((c) => c.id === id);

// --- People ----------------------------------------------------------------
export const getTeacher = (id: string) => TEACHERS.find((t) => t.id === id);
export const getTeachers = () => TEACHERS;
export const getCertifiedTeachers = () =>
  TEACHERS.filter((t) =>
    CERTIFICATIONS.some((c) => c.teacherId === t.id && c.status === "issued"),
  );
export const getSchool = (id: string) => SCHOOLS.find((s) => s.id === id);
export const getSchools = () => SCHOOLS;

// --- Enrolments and progress ----------------------------------------------
export const getEnrolmentsForTeacher = (teacherId: string) =>
  ENROLMENTS.filter((e) => e.teacherId === teacherId);
export const getEnrolment = (teacherId: string, courseId: string) =>
  ENROLMENTS.find((e) => e.teacherId === teacherId && e.courseId === courseId);

// --- Certifications --------------------------------------------------------
export const getCertificationsForTeacher = (teacherId: string) =>
  CERTIFICATIONS.filter((c) => c.teacherId === teacherId);
export const getCertification = (id: string) =>
  CERTIFICATIONS.find((c) => c.id === id);
export const getCertificationByNumber = (num: string) =>
  CERTIFICATIONS.find(
    (c) => c.certificateNumber.toUpperCase() === num.trim().toUpperCase(),
  );

// --- Vacancies and applications -------------------------------------------
export const getVacancies = () => VACANCIES;
export const getOpenVacancies = () =>
  VACANCIES.filter((v) => v.status === "open");
export const getVacancy = (id: string) => VACANCIES.find((v) => v.id === id);
export const getVacanciesForSchool = (schoolId: string) =>
  VACANCIES.filter((v) => v.schoolId === schoolId);

export const getApplicationsForTeacher = (teacherId: string) =>
  APPLICATIONS.filter((a) => a.teacherId === teacherId);
export const getApplicationsForVacancy = (vacancyId: string) =>
  APPLICATIONS.filter((a) => a.vacancyId === vacancyId);
export const getApplicationsForSchool = (schoolId: string) => {
  const vacancyIds = getVacanciesForSchool(schoolId).map((v) => v.id);
  return APPLICATIONS.filter((a) => vacancyIds.includes(a.vacancyId));
};

// --- Placements ------------------------------------------------------------
export const getPlacements = () => PLACEMENTS;
export const getPlacementsForSchool = (schoolId: string) =>
  PLACEMENTS.filter((p) => p.schoolId === schoolId);

// --- Staff (market one) ----------------------------------------------------
export const getStaffInvitationsForSchool = (schoolId: string) =>
  STAFF_INVITATIONS.filter((i) => i.schoolId === schoolId);
export const getSponsoredTeachers = (schoolId: string) =>
  TEACHERS.filter((t) => t.sponsoringSchoolId === schoolId);

// --- Leads -----------------------------------------------------------------
export const getPilotLeads = () => PILOT_LEADS;

// --- Formatting ------------------------------------------------------------
/** Format a number as Indian rupees, for example INR 1,50,000. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// --- Match indicator -------------------------------------------------------
export function matchTeacherToVacancy(
  teacher: Teacher,
  vacancy: Vacancy,
): MatchResult {
  return scoreMatch({
    teacherSubjects: teacher.subjects,
    teacherCity: teacher.city,
    teacherProgrammes: teacher.programmes,
    vacancySubject: vacancy.subject,
    vacancyProgramme: vacancy.programme,
    vacancyLocation: vacancy.location,
  });
}

// --- Derived metrics (admin) ----------------------------------------------
export function platformMetrics() {
  const inTraining = TEACHERS.filter(
    (t) => t.status === "training",
  ).length;
  const certified = TEACHERS.filter(
    (t) => t.status === "certified" || t.status === "open_to_offers",
  ).length;
  const placed = TEACHERS.filter((t) => t.status === "placed").length;
  const placements = PLACEMENTS.length;
  const filledVacancies = VACANCIES.filter((v) => v.status === "filled").length;
  const totalVacancies = VACANCIES.length;
  const fillRate = totalVacancies
    ? Math.round((filledVacancies / totalVacancies) * 100)
    : 0;

  const feePipeline = {
    pending: PLACEMENTS.filter((p) => p.feeStatus === "pending").reduce(
      (s, p) => s + p.placementFee,
      0,
    ),
    invoiced: PLACEMENTS.filter((p) => p.feeStatus === "invoiced").reduce(
      (s, p) => s + p.placementFee,
      0,
    ),
    paid: PLACEMENTS.filter((p) => p.feeStatus === "paid").reduce(
      (s, p) => s + p.placementFee,
      0,
    ),
  };

  return {
    inTraining,
    certified,
    placed,
    placements,
    fillRate,
    feePipeline,
  };
}

export type { Course, Teacher, School, Enrolment, Vacancy };
