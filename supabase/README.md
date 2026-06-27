# Supabase

All database SQL lives here as ordered `.sql` migration files so the schema can
be reapplied cleanly to a fresh project.

## Layout

```
supabase/
  migrations/   ordered NNNN_name.sql files (schema, enums, RLS, functions)
  seed.sql      demo seed data (added in phase 7)
```

## Applying

Run the migration files in numeric order against your Supabase project, either
through the SQL editor or the Supabase CLI:

```
supabase db push          # with the Supabase CLI linked to your project
# or paste each migrations/*.sql file, in order, into the SQL editor
```

## Build order (per the brief)

- Phase 2: `profiles` + role enum, sign-up trigger, `is_admin()` helper, self-access RLS.
- Phase 3: `teacher_profiles`, `school_profiles`, Storage buckets and policies.
- Phase 4: `courses`, `modules`, `lessons`, `enrolments`, `lesson_progress`, progress triggers.
- Phase 5: `assessments`, questions, attempts, `certifications`, scoring RPC, verification function.
- Phase 6: `vacancies`, `applications`, `placements`, `staff_invitations`, `pilot_leads`, hire trigger.
- Phase 7: `seed.sql`.

Enums and tables are defined exactly as specified in the build brief, section 5.
RLS policies follow section 6. The certifications table is never exposed
directly; public verification goes through a security-definer function.
