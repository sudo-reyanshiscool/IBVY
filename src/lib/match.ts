/**
 * Match scoring: a pure function comparing a teacher and a vacancy across
 * subject, programme, and city. No machine learning. Returned as a small
 * editorial chip (see match-chip.tsx). Refined alongside real data in phase 6.
 */

export type MatchLevel = "strong" | "subject" | "programme" | "weak";

export interface MatchInput {
  teacherSubjects: string[];
  teacherCity?: string | null;
  vacancySubject: string;
  vacancyProgramme?: string | null;
  teacherProgrammes?: string[];
  vacancyLocation?: string | null;
}

export interface MatchResult {
  level: MatchLevel;
  score: number; // 0..100
  label: string;
}

const norm = (s?: string | null) => (s ?? "").trim().toLowerCase();

export function scoreMatch(input: MatchInput): MatchResult {
  const subjects = input.teacherSubjects.map(norm);
  const subjectMatch = subjects.includes(norm(input.vacancySubject));

  const programmeMatch =
    !!input.vacancyProgramme &&
    (input.teacherProgrammes ?? []).map(norm).includes(norm(input.vacancyProgramme));

  const cityMatch =
    !!input.teacherCity &&
    !!input.vacancyLocation &&
    norm(input.vacancyLocation).includes(norm(input.teacherCity));

  let score = 0;
  if (subjectMatch) score += 60;
  if (programmeMatch) score += 25;
  if (cityMatch) score += 15;

  let level: MatchLevel = "weak";
  let label = "Possible match";
  if (subjectMatch && (programmeMatch || cityMatch)) {
    level = "strong";
    label = "Strong match";
  } else if (subjectMatch) {
    level = "subject";
    label = "Subject match";
  } else if (programmeMatch) {
    level = "programme";
    label = "Programme match";
  }

  return { level, score, label };
}
