/**
 * Domain types for IBvy. These mirror the Postgres schema (brief, section 5)
 * and are the shape both the mock data layer and, later, the Supabase queries
 * return. UI components depend on these, not on any data source.
 */

export type SchoolType = "established_ib" | "transforming";
export type Curriculum = "IB" | "IGCSE" | "CBSE" | "ICSE" | "other";
export type IbProgramme = "PYP" | "MYP" | "DP";
export type CourseLevel = "foundation" | "advanced";
export type EnrolmentStatus = "enrolled" | "in_progress" | "completed";
export type TeacherStatus = "training" | "certified" | "placed" | "open_to_offers";
export type VacancyStatus = "open" | "filled" | "closed";
export type ApplicationStatus =
  | "applied"
  | "shortlisted"
  | "interview"
  | "offered"
  | "hired"
  | "rejected"
  | "withdrawn";
export type FeeStatus = "pending" | "invoiced" | "paid";
export type CertStatus = "issued" | "revoked";
export type InvitationStatus = "pending" | "accepted" | "expired";
export type LeadStatus = "new" | "contacted" | "converted" | "closed";

export interface Teacher {
  id: string;
  fullName: string;
  subjects: string[];
  yearsExperience: number;
  currentCurriculum?: Curriculum;
  qualifications?: string;
  city?: string;
  bio?: string;
  phone?: string;
  programmes: IbProgramme[];
  status: TeacherStatus;
  sponsoringSchoolId?: string;
  photoColour: string; // for the avatar tint in the prototype
}

export interface School {
  id: string;
  schoolName: string;
  schoolType: SchoolType;
  curriculaOffered: Curriculum[];
  city?: string;
  website?: string;
  contactName?: string;
  contactPhone?: string;
  size?: string;
  verified: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // markdown
  videoUrl?: string;
  durationMin?: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  programme?: IbProgramme;
  level: CourseLevel;
  description: string;
  durationHours: number;
  published: boolean;
  modules: Module[];
  assessment: {
    title: string;
    passingScore: number;
    questions: AssessmentQuestion[];
  };
}

export interface Enrolment {
  id: string;
  teacherId: string;
  courseId: string;
  status: EnrolmentStatus;
  progressPct: number;
  sponsoredBySchoolId?: string;
  completedLessonIds: string[];
}

export interface Certification {
  id: string;
  teacherId: string;
  courseId: string;
  certificateNumber: string;
  status: CertStatus;
  issuedAt: string; // ISO date
}

export interface Vacancy {
  id: string;
  schoolId: string;
  title: string;
  subject: string;
  programme?: IbProgramme;
  level?: string;
  description: string;
  requirements?: string;
  location?: string;
  salaryRange?: string;
  status: VacancyStatus;
  postedAt: string;
}

export interface Application {
  id: string;
  vacancyId: string;
  teacherId: string;
  status: ApplicationStatus;
  coverNote?: string;
  invitedBySchool: boolean;
  appliedAt: string;
}

export interface Placement {
  id: string;
  vacancyId: string;
  teacherId: string;
  schoolId: string;
  placementFee: number;
  feeStatus: FeeStatus;
  placedAt: string;
}

export interface StaffInvitation {
  id: string;
  schoolId: string;
  teacherEmail: string;
  teacherName?: string;
  status: InvitationStatus;
  createdAt: string;
}

export interface PilotLead {
  id: string;
  schoolName: string;
  contactName?: string;
  email: string;
  phone?: string;
  city?: string;
  schoolType?: SchoolType;
  message?: string;
  status: LeadStatus;
  createdAt: string;
}
