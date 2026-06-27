# Build Brief: IBvy (IB Teacher Training and Placement Platform, MVP)

> Hand this whole file to Claude Code. Build it in the phases given, in order, and pause at the end of each phase so it can be reviewed before moving on.

---

## 0. Name and house rules

- **Name:** IBvy, read as "IB" plus "ivy": IB credentials with an Ivy League weight. Keep the brand string in one constant (`SITE_NAME`) and reference it everywhere rather than hard-coding, so any later tweak stays a one-line change.
- **Language:** British English everywhere in UI copy, code comments, and content (enrolment, programme, organise, centre, specialise, vetted).
- **Punctuation:** Never use em dashes in any copy, anywhere. Use commas, colons, or full stops.
- **Colour rule:** Never use red, not even for errors or destructive actions. Warning and destructive states use clay (a warm brown) or ink. See the palette in section 4.

---

## 1. The product in one paragraph

India's IB and international-curriculum schools have grown more than 40% in five years, but the supply of qualified IB teachers has not kept pace. This is a supply problem disguised as a hiring problem. IBvy is a single engine that **sources, trains, certifies, and places** IB teachers. An expert educator board designs the curriculum, ambitious teachers train and certify through it at low or no upfront cost, and vetted partner schools hire from that certified pool. Schools pay a placement fee per hire (the primary revenue), with the same training rail sold to transforming schools that need to upskill their existing staff. The wedge against incumbents is that IBvy keeps teachers inside India's own international schools rather than exporting them abroad.

The MVP must prove the **full loop end to end**: a teacher enrols, completes a course, passes an assessment, becomes certified, appears in the talent pool, applies to a school vacancy, gets hired, and a placement record with a fee is created and tracked.

---

## 2. The three roles, the three markets, and the core loop

Three authenticated roles. (A dedicated self-serve "Educator/Trainer" authoring role is deliberately deferred to phase 2; for the MVP, the board's curriculum is authored through the admin panel. See section 11.)

1. **Teacher (supply).** Aspiring or junior teachers. They build a profile, enrol in board-designed courses, complete lessons, pass assessments, earn certification, browse vacancies, and apply.
2. **School (demand).** IB schools, plus CBSE or other schools transforming towards IB. They post vacancies, browse the certified teacher pool, invite teachers to apply, run an applicant pipeline, confirm hires, and (if transforming) sponsor their own existing staff through IBvy training.
3. **Admin (platform and board).** Authors courses, modules, lessons and assessments, reviews and issues certifications, verifies schools, oversees placements, handles pilot leads, and marks fees as invoiced or paid.

**The three markets.** The Teacher role serves market three (teachers who want to become IB: upskilling and becoming). The School role serves two markets, separated by a `school_type` chosen at sign-up:
- **Market two, established IB (the empty front of the room):** schools hiring certified teachers. Revenue is the placement fee.
- **Market one, transforming to IB (aspiration):** CBSE or other schools upskilling the staff they already have, by sponsoring those staff into IBvy courses.

Market one and market three ride the **same train-and-certify rail**. The only difference is who is being trained and who pays. Build the rail once and serve both.

**The core loop, made explicit:**

```
SOURCE -> TRAIN -> CERTIFY -> MATCH -> PLACE -> TRACK FEE
teacher    course    pass       school     school     placement
signs up   lessons   assessment  posts      hires      record +
+ profile  + progress + cert     vacancy    teacher    fee status
```

**Market one variant of the loop:** a transforming school invites its existing staff, sponsors their course enrolments, and watches them certify. Same rail, no vacancy or placement step.

Every phase below should keep this loop the north star. If a feature does not move a teacher along this loop or help a school hire from it or upskill into it, it is out of scope for the MVP.

---

## 3. Tech stack (locked, do not substitute)

- **Framework:** Next.js (latest, App Router) with TypeScript and the `/app` directory.
- **Styling:** Tailwind CSS (latest).
- **Component primitives:** shadcn/ui, restyled to the IBvy brand (see section 4). Use it for buttons, inputs, dialogs, tables, tabs, dropdowns, badges, cards.
- **Icons:** lucide-react.
- **Backend and data:** Supabase (Postgres, Auth, Storage, Row Level Security). Use `@supabase/ssr` for auth in the App Router (server components, route handlers, and middleware).
- **Forms and validation:** react-hook-form with zod.
- **Charts (admin dashboard only):** recharts.
- **Fonts:** Lora (serif, for display and headings) and Inter (sans, for UI and body), both via `next/font/google`.
- **Deployment target:** Vercel. Environment variables for Supabase URL and anon key; service-role key only in server-side code.

Project structure: a single Next.js app. Keep all Supabase SQL (schema, enums, RLS policies, functions, seed) in a `/supabase` folder as ordered `.sql` migration files so it can be reapplied cleanly.

---

## 4. Brand and design system

The feel is **editorial and institutional**, closer to a serious education institute or an academic journal than a startup SaaS. The name earns an ivy-led palette: deep ivy green for the IB-plus-Ivy idea, warm cream for editorial heritage, muted brass for collegiate prestige and to mark certification. Restrained, confident, old-money rather than neon-gradient. Generous whitespace, strong typographic hierarchy, quiet motion.

**Colour tokens** (define as CSS variables and Tailwind theme colours):

| Token | Use | Value |
|---|---|---|
| `paper` | App background | warm cream, `#F4F1E9` |
| `paper-raised` | Cards and raised surfaces | `#FBFAF5` |
| `ink` | Primary text | warm near-black, `#1A1F1B` |
| `ivy` | Primary brand: headers, nav, primary buttons | deep ivy green, `#1E3A2B` |
| `ivy-tint` | Hover and selected states, secondary green | `#3A6049` |
| `sage` | Muted surfaces, neutral and in-progress status | `#7E9685` |
| `sage-soft` | Pale sage surface and progress track | `#DDE5DC` |
| `brass` | Accent, certification, key icons and borders | muted antique gold, `#9C7A3C` |
| `brass-tint` | Accent and badge backgrounds | `#E9DEC8` |
| `clay` | Destructive and warning, a warm brown, never red | `#8A4B2F` |
| `line` | Borders and dividers | warm grey, `#D6D2C4` |

Never introduce red. Any "danger", "error", or "destructive" affordance uses `clay` or `ink`. Certified and paid states use `brass` and `ivy`, not the usual green-and-red traffic lights. Accessibility note for the build: `brass` is for accents, borders, icons and large numerals, not body text, where its contrast on cream is borderline. `ink` carries body copy; white text sits on `ivy` buttons.

**Typography:**
- Display and headings: Lora.
- UI, body, labels, tables: Inter.
- Real hierarchy: large serif page titles, clear section headers, comfortable body line height.

**Components and patterns to establish early:**
- A shared dashboard shell: left sidebar nav (role-aware), top bar with the user's name and role, content area on `paper`.
- Status pills (enrolled, in progress, completed, certified, applied, shortlisted, hired, pending, paid). Use ivy, brass, and sage tones, clay only for negative or withdrawn states. Muted and editorial, never bright.
- Cards for courses, vacancies, and teacher profiles.
- A progress bar for course completion (ivy fill on a `sage-soft` track).
- A simple kanban or column pipeline for school applicant stages.
- A small **match indicator** chip (for example "Strong match", "Subject match") shown against vacancies and talent.
- A **staff-in-training** cohort table for transforming schools.
- Tables for admin lists.

**Marketing pages** are three clear doors, each a serious editorial page:
- **Become IB** (teachers): train at low or no upfront cost, certify, get placed.
- **Fill the room** (established IB schools): hire pre-vetted, board-certified teachers; pay only on a successful placement.
- **Transform to IB** (CBSE and transforming schools): upskill the staff you already have towards IB-readiness.

---

## 5. Data model (Supabase, Postgres)

Write these as migration files. Use `gen_random_uuid()` for primary keys, `timestamptz` for times, and Postgres enum types for status fields. Enable RLS on every table (policies in section 6).

```sql
-- ENUMS
create type user_role as enum ('teacher', 'school', 'admin');
create type school_type as enum ('established_ib', 'transforming');
create type curriculum as enum ('IB', 'IGCSE', 'CBSE', 'ICSE', 'other');
create type ib_programme as enum ('PYP', 'MYP', 'DP');
create type course_level as enum ('foundation', 'advanced');
create type enrolment_status as enum ('enrolled', 'in_progress', 'completed');
create type teacher_status as enum ('training', 'certified', 'placed', 'open_to_offers');
create type vacancy_status as enum ('open', 'filled', 'closed');
create type application_status as enum ('applied', 'shortlisted', 'interview', 'offered', 'hired', 'rejected', 'withdrawn');
create type fee_status as enum ('pending', 'invoiced', 'paid');
create type cert_status as enum ('issued', 'revoked');
create type invitation_status as enum ('pending', 'accepted', 'expired');
create type lead_status as enum ('new', 'contacted', 'converted', 'closed');

-- PROFILES (extends auth.users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null,
  full_name text not null,
  created_at timestamptz not null default now()
);

-- TEACHER PROFILES
create table teacher_profiles (
  user_id uuid primary key references profiles(id) on delete cascade,
  subjects text[] not null default '{}',
  years_experience int not null default 0,
  current_curriculum curriculum,
  qualifications text,
  city text,
  bio text,
  phone text,
  resume_url text,
  profile_photo_url text,
  status teacher_status not null default 'training',
  sponsoring_school_id uuid references profiles(id),   -- set when a transforming school sponsors this teacher
  created_at timestamptz not null default now()
);

-- SCHOOL PROFILES
create table school_profiles (
  user_id uuid primary key references profiles(id) on delete cascade,
  school_name text not null,
  school_type school_type not null default 'established_ib',  -- market two vs market one
  curricula_offered curriculum[] not null default '{}',
  city text,
  website text,
  contact_name text,
  contact_phone text,
  size text,
  logo_url text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- COURSES (authored by admin / the board)
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  programme ib_programme,
  level course_level not null default 'foundation',
  description text,
  duration_hours int,
  cover_image_url text,
  published boolean not null default false,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  position int not null default 0
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  title text not null,
  content text,            -- markdown
  video_url text,          -- embed URL (YouTube/Vimeo) for MVP
  duration_min int,
  position int not null default 0
);

-- ENROLMENT and PROGRESS
create table enrolments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  status enrolment_status not null default 'enrolled',
  progress_pct int not null default 0,
  sponsored_by_school_id uuid references profiles(id),  -- set for market one sponsored staff
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (teacher_id, course_id)
);

create table lesson_progress (
  id uuid primary key default gen_random_uuid(),
  enrolment_id uuid not null references enrolments(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (enrolment_id, lesson_id)
);

-- ASSESSMENTS (one per course for MVP)
create table assessments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  passing_score int not null default 70
);

create table assessment_questions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references assessments(id) on delete cascade,
  question text not null,
  options jsonb not null,   -- array of strings
  correct_index int not null,
  position int not null default 0
);

create table assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  enrolment_id uuid not null references enrolments(id) on delete cascade,
  score int not null,
  passed boolean not null,
  attempted_at timestamptz not null default now()
);

-- CERTIFICATIONS
create table certifications (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  certificate_number text not null unique,
  status cert_status not null default 'issued',
  issued_at timestamptz not null default now(),
  unique (teacher_id, course_id)
);

-- VACANCIES
create table vacancies (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  subject text not null,
  programme ib_programme,
  level text,
  description text,
  requirements text,
  location text,
  salary_range text,
  status vacancy_status not null default 'open',
  posted_at timestamptz not null default now()
);

-- APPLICATIONS (teacher -> vacancy). Also used for school "invite to apply".
create table applications (
  id uuid primary key default gen_random_uuid(),
  vacancy_id uuid not null references vacancies(id) on delete cascade,
  teacher_id uuid not null references profiles(id) on delete cascade,
  status application_status not null default 'applied',
  cover_note text,
  invited_by_school boolean not null default false,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vacancy_id, teacher_id)
);

-- PLACEMENTS (the revenue event)
create table placements (
  id uuid primary key default gen_random_uuid(),
  vacancy_id uuid not null references vacancies(id) on delete cascade,
  teacher_id uuid not null references profiles(id) on delete cascade,
  school_id uuid not null references profiles(id) on delete cascade,
  placement_fee numeric not null default 0,
  fee_status fee_status not null default 'pending',
  placed_at timestamptz not null default now()
);

-- STAFF INVITATIONS (market one: a transforming school invites its existing staff)
create table staff_invitations (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references profiles(id) on delete cascade,
  teacher_email text not null,
  teacher_name text,
  status invitation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- PILOT LEADS (request a pilot, from the marketing pages)
create table pilot_leads (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  contact_name text,
  email text not null,
  phone text,
  city text,
  school_type school_type,
  message text,
  status lead_status not null default 'new',
  created_at timestamptz not null default now()
);
```

**Derived behaviour to implement in app logic or Postgres functions and triggers:**
- When all lessons in an enrolment are complete, set `enrolments.status = 'completed'`, stamp `completed_at`, and recompute `progress_pct`. (Sponsored staff use the exact same rail; no separate logic.)
- When an `assessment_attempts` row is inserted with `passed = true` for a completed enrolment, create a `certifications` row with a generated `certificate_number` (format `IBVY-{YEAR}-{6 random alphanumerics}`) and set the teacher's `teacher_profiles.status` to `certified` (if not already `placed`).
- When an application's status is set to `hired`, create a `placements` row (with the school's configured fee), set the vacancy to `filled`, set the teacher's status to `placed`, and reject the remaining open applications on that vacancy.
- **Certificate verification** is served by a security-definer function that takes a `certificate_number` and returns only the public fields (course title, teacher name, issue date, and whether the certification is issued or revoked). The `certifications` table itself stays protected; verification never exposes the whole table.

---

## 6. Auth, roles, and access control

- Email and password auth via Supabase Auth. On sign-up, the user picks a role (teacher or school). Admin accounts are seeded, not self-registered.
- Create the `profiles` row on sign-up (server-side), then route the user into the matching onboarding flow. Schools choose their `school_type` (established IB or transforming) during onboarding.
- **Middleware** guards route groups by role: `/teacher/*` for teachers, `/school/*` for schools, `/admin/*` for admins. Signed-out users hitting a protected route go to `/login`. A signed-in user hitting the wrong group is redirected to their own dashboard.
- Provide an `is_admin()` security-definer helper (true when the caller's `profiles.role = 'admin'`) for admin-permissive policies.
- **RLS policies** (enable on all tables):
  - A user can read and update their own `profiles`, `teacher_profiles`, or `school_profiles` row.
  - Teachers can read `courses`, `modules`, `lessons`, `assessments`, and `assessment_questions` where the parent course is `published = true`. Do not expose `correct_index` to the client; score server-side via a security-definer RPC.
  - Teachers can read and write their own `enrolments`, `lesson_progress`, `assessment_attempts`, `applications`, and read their own `certifications`.
  - Teachers can read `vacancies` where `status = 'open'`.
  - Schools can read and write their own `vacancies`, read `applications` on their own vacancies, and update those application statuses. Schools can read `teacher_profiles` and `certifications` for teachers who are certified (the talent pool), but a teacher's phone and resume stay gated until an application or invite links them.
  - Schools can read their own `placements`, create and read their own `staff_invitations`, and read the `teacher_profiles` and `enrolments` of teachers whose `sponsoring_school_id` equals the school (their own staff in training).
  - `pilot_leads`: anyone may insert (the public form); only admin may read.
  - Certificate verification is public but only through the security-definer function described in section 5, never a direct table read.
  - Admin (`is_admin()` or the service role) can read and write everything.
- Never ship the service-role key to the client. Assessment scoring, certificate issuance, placement creation, and lead reads run server-side.

---

## 7. Routes and screens (page by page)

### Public and marketing
- `/` Landing. Serif hero with the one-line promise, the problem stated plainly, the three-step engine (Source, Train, Place), the educator board as the credibility anchor, the domestic-first differentiator, and the three doors below.
- `/become-ib` Teachers (market three): train at low or no upfront cost, certify, get placed.
- `/hiring` Established IB schools (market two), headline "Fill the room": hire pre-vetted certified teachers, pay only on a successful placement. Includes a **request a pilot** form.
- `/transform` Transforming schools (market one), headline "Transform to IB": upskill your existing staff towards IB-readiness. Includes a **request a pilot** form.
- `/courses` Public catalogue preview (titles, subjects, programmes; full content behind sign-in).
- `/the-board` The expert educator board (five India-based IB veterans plus five globally respected IB educators; placeholder profiles for now).
- `/verify` Public certificate verification: enter a certificate number.
- `/verify/[number]` The verification result: genuine or not, with course, teacher and issue date (via the security-definer function).
- `/login`, `/signup` (sign-up includes role selection; schools then pick `school_type`).

### Teacher (`/teacher/*`)
- `/teacher` Dashboard: course progress, certifications earned, and recommended open vacancies matched to the teacher's subjects.
- `/teacher/courses` My enrolments plus the full catalogue to enrol from.
- `/teacher/courses/[id]` Course player: module and lesson list, lesson content (markdown plus optional video embed), mark-lesson-complete, progress bar, and a link to the assessment once all lessons are done.
- `/teacher/courses/[id]/assessment` Multiple-choice assessment; on pass, certification is issued and the teacher is shown a success state.
- `/teacher/certifications` Earned certifications, each linking to a printable certificate page (`/teacher/certifications/[id]`) in the IBvy brand, showing the verifiable certificate number.
- `/teacher/jobs` Browse open vacancies with filters (subject, programme, location) and a **match indicator** on each.
- `/teacher/jobs/[id]` Vacancy detail and apply (with a short cover note).
- `/teacher/applications` Track application statuses across the pipeline.
- `/teacher/profile` Edit profile, qualifications, subjects, photo, and resume upload (Supabase Storage).

### School (`/school/*`)
The dashboard leans on `school_type`: an established IB school sees hiring first, a transforming school sees staff training first. Both can reach everything.
- `/school` Dashboard: active vacancies, applicant pipeline summary, recent placements and outstanding fees (established), and staff-in-training progress (transforming).
- `/school/vacancies` List of own vacancies with status; button to create.
- `/school/vacancies/new` Create a vacancy.
- `/school/vacancies/[id]` Vacancy detail with an applicant pipeline (columns: applied, shortlisted, interview, offered, hired) and a **match indicator** on each applicant. Moving a candidate to "hired" triggers the placement.
- `/school/talent` Browse the certified teacher pool, filter by subject and programme, with a **match indicator**. Contact details stay gated until an invite or application links them.
- `/school/talent/[id]` Teacher profile with an "invite to apply" action that creates an application flagged `invited_by_school`.
- `/school/staff` Market one cohort view: invite existing staff (creates a `staff_invitations` row), sponsor them into courses, and track each one's progress to certification.
- `/school/placements` Hires made, each with its fee and fee status.
- `/school/profile` Edit school profile, type, and logo.

### Admin (`/admin/*`)
- `/admin` Platform metrics: teachers in training, teachers certified, placements to date, fill rate, time to placement, and the fee pipeline (pending, invoiced, paid). A couple of small editorial recharts charts.
- `/admin/courses` Author courses, modules, lessons, and one assessment per course. Publish and unpublish.
- `/admin/certifications` Review issued certifications; revoke if needed.
- `/admin/schools` Verify schools (toggle `verified`); see school type.
- `/admin/placements` Oversee all placements; mark fees as invoiced or paid.
- `/admin/leads` Pilot leads from the marketing forms, with status.
- `/admin/users` List of teachers and schools.

---

## 8. Feature detail by role

**Teacher journey (market three, the supply side):**
1. Sign up as a teacher, complete onboarding (name, subjects, years of experience, current curriculum, city, qualifications).
2. Enrol in a published course. Work through modules and lessons, marking each complete; progress updates live.
3. On completing all lessons, take the course assessment. Passing issues a certification automatically (with a verifiable number) and updates status to certified.
4. With certified status, the teacher appears in the school-facing talent pool and can apply to open vacancies, guided by the match indicator.
5. Track applications through to a hire.

**Established IB school journey (market two, the demand side):**
1. Sign up as a school, choose `school_type = established_ib`, complete onboarding. Awaits admin verification (can still operate; verification is a trust badge).
2. Post a vacancy.
3. Browse the certified talent pool by match, or wait for applicants, or invite specific teachers to apply.
4. Move applicants through the pipeline. Marking a candidate "hired" creates a placement, fills the vacancy, and records the fee as pending.
5. Track placements and fees.

**Transforming school journey (market one, the same training rail):**
1. Sign up as a school, choose `school_type = transforming`, complete onboarding.
2. From `/school/staff`, invite existing staff by email (creates `staff_invitations`). On sign-up those teachers are linked by `sponsoring_school_id`.
3. Sponsor staff into the relevant courses (records `sponsored_by_school_id` on the enrolment).
4. Watch the cohort progress to certification on the staff view. The teachers use the identical course, assessment, and certification rail.

**Admin journey (the quality and revenue engine):**
1. Author the board's curriculum: courses, modules, lessons, and assessments.
2. Review and issue or revoke certifications.
3. Verify schools and read pilot leads.
4. Oversee placements and update fee status as they are invoiced and paid.
5. Watch the supply and demand metrics on the dashboard.

**Certificate verification:** the printable certificate shows a number in the format `IBVY-{YEAR}-{6 alphanumerics}`. Anyone (a hiring school, a parent, a sceptic) can enter that number at `/verify` and confirm it is genuine, with the course, teacher and date. The number is the trust object and links back to IBvy from a teacher's CV.

**Match indicator:** a pure function scoring subject match, programme match, and city overlap between a teacher and a vacancy. Shown as a small editorial chip on the teacher's job list and the school's talent and applicant views. No machine learning.

**Placement fee logic:** store a default placement fee as a config value (a flat configurable amount is fine for the MVP). When a hire happens, snapshot that fee onto the placement row so later config changes do not rewrite history.

---

## 9. Build phases (do these in order, pause after each)

1. **Scaffold and foundations.** Next.js + TypeScript + Tailwind + shadcn/ui. Fonts (Lora, Inter). Brand tokens and the ivy palette from section 4. Supabase client wiring (`@supabase/ssr`). The role-aware dashboard shell. Confirm it runs and deploys.
2. **Auth and roles.** Sign-up with role selection, login, sign-out, profile creation, middleware route protection per role, and the three empty role dashboards.
3. **Profiles and onboarding.** Teacher onboarding, and school onboarding including the `school_type` choice. Profile pages, photo and logo and resume uploads to Supabase Storage. RLS for self-access.
4. **Courses and learning.** Admin course authoring (courses, modules, lessons). Teacher catalogue, enrolment, the course player, lesson completion, and live progress. Seed two or three courses to test against.
5. **Assessments, certification, and verification.** Assessment authoring (admin), the teacher assessment flow, server-side scoring, automatic certification issuance, certificate pages, the status transition to certified, and the public `/verify` flow backed by the security-definer function.
6. **Vacancies, talent, applications, placements, staff training, and leads.** School vacancy CRUD; the certified talent pool with gated contacts and the match indicator; teacher applications; the school applicant pipeline; the hire action, placement creation and fee tracking; the market one staff track (`/school/staff`, invitations, sponsored enrolments); the request-a-pilot form writing to `pilot_leads`; and admin oversight of placements and leads.
7. **Marketing pages, admin dashboard, seed data, and polish.** The landing with its three doors, the Become IB, Fill the room, and Transform to IB pages, the admin metrics dashboard with charts (including fill rate and time to placement), full seed data so the demo looks alive, empty states, loading states, and a pass on responsive layout and accessibility.

After phase 7, the full loop and both school markets must be demonstrable end to end with seeded and live data.

---

## 10. Seed data

Seed enough to make the platform feel populated for a demo:
- 1 admin account.
- 3 to 4 published courses across IB programmes and subjects (for example: MYP Individuals and Societies, DP Mathematics Analysis and Approaches, DP English Literature, MYP Design), each with 2 to 3 modules, a few lessons of real placeholder content, and a 5-question assessment.
- 6 to 8 teacher accounts spread across the loop: some in training, some certified, one or two placed. Vary subjects and cities.
- 3 to 4 school accounts: at least two established IB (one verified) and at least one transforming, with two of its staff already invited and sponsored into a course and partway to certification.
- 4 to 5 open vacancies across subjects, with a couple of in-progress applications and one completed placement with a recorded fee.
- 2 to 3 pilot leads in the `new` and `contacted` states.

Keep all seeded copy in British English with no em dashes.

---

## 11. Out of scope for the MVP (phase 2 and beyond)

Do not build these now; leave clean seams for them:
- **Live payments.** No Razorpay or Stripe yet. The placement fee is recorded and its status is set manually by admin. Razorpay is the likely India choice for phase 2; the placement model is ready for it.
- **Billing of staff training.** The market one training track itself is in the MVP. Charging transforming schools for sponsored seats is sales-led for now, not productised billing.
- **Self-serve Educator/Trainer role.** The board's curriculum is admin-authored for now. A dedicated educator login that authors and is attributed on courses is a phase-2 addition; `courses.created_by` already anticipates it.
- **IB-readiness diagnostic.** A self-assessment that scores how far a school or teacher is from IB-ready and recommends courses. A strong funnel hook, but real extra build.
- **Reviews and ratings** (schools review placed teachers, teachers rate courses).
- **Live cohorts** with the board teaching on a schedule. Self-paced proves the loop.
- **Messaging and chat** between schools and teachers. Use application status, invitations, and gated contacts for now.
- **Email notifications.** Optional later via a provider such as Resend.
- **Real video hosting.** Lessons use embed URLs (YouTube or Vimeo).
- **Native mobile app.**

---

## 12. Definition of done

The MVP is complete when, on a deployed Vercel instance with seeded data:
1. A new teacher can sign up, onboard, enrol in a course, complete it, pass the assessment, and receive a certification automatically.
2. That newly certified teacher appears in the school-facing talent pool with a match indicator against relevant vacancies.
3. An established IB school can sign up, post a vacancy, see applicants (or invite a teacher), move a candidate to hired, and a placement with a pending fee is created.
4. A transforming school can sign up as `transforming`, invite a staff member, sponsor them into a course, and watch them progress to certification on the staff view.
5. Anyone can enter a certificate number at `/verify` and get a correct genuine-or-not result without the certifications table being exposed.
6. A school not ready to sign up can submit the request-a-pilot form and it appears in `/admin/leads`.
7. Admin can author a course end to end, verify a school, and mark a placement fee as paid.
8. The whole experience is in the IBvy brand: warm cream, ivy and brass, Lora and Inter, British English, no em dashes, and no red anywhere (destructive states use clay).
9. RLS is enforced: no role can read or write another role's private data, and assessment answers and gated contact details are never exposed to the client improperly.

---

*Suggested first message to Claude Code: "Read this entire brief. Start with Phase 1 only (scaffold and foundations) and stop when it runs locally so I can review before Phase 2."*

---

<!-- Next.js scaffold note (from create-next-app). This version of Next.js may have breaking
changes versus older training data: consult node_modules/next/dist/docs/ before writing Next.js code. -->
