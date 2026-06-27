# IBvy

IBvy (read as "IB" plus "ivy") is the engine that **sources, trains, certifies, and places** IB teachers inside India's own international schools. It serves three roles (teacher, school, admin) across three markets, on a single train-and-certify rail.

This repository currently runs as a **working prototype**: every feature is browsable with seeded demo data and no backend required. The real Supabase data and auth layer is scaffolded behind a clean seam and switches on when configured.

## Tech stack

- **Next.js 16** (App Router, TypeScript) and **Tailwind CSS v4**
- **shadcn/ui** primitives, restyled to the IBvy brand, with **lucide-react** icons
- **Lora** (display) and **Inter** (UI) via `next/font/google`
- **recharts** for the admin dashboard
- **Supabase** (`@supabase/ssr`) for auth, Postgres, Storage and RLS (scaffolded)
- Deployed on **Vercel**

## Demo mode

When no Supabase environment variables are set, the app runs in demo mode:

- No login wall. Browse the teacher, school, and admin workspaces directly from the landing page.
- Seeded mock data drives every screen (see `src/lib/mock/`).
- An "act as" switcher in the dashboard top bar lets you browse as different teachers and schools (including a transforming school for the market-one staff-training flow).

The flag lives in `src/lib/config.ts`. The single data-access seam is `src/lib/data/queries.ts`: every screen reads from it, so swapping mock data for Supabase queries is localised.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To connect a real Supabase backend, copy `.env.example` to `.env.local` and fill in your project's values. The SQL lives in `supabase/migrations/` as ordered files (see `supabase/README.md`).

## Project structure

```
src/
  app/
    (marketing)/     public landing and door pages, courses, the board, verify
    (auth)/          login and signup
    teacher/         teacher workspace
    school/          school workspace (established IB and transforming)
    admin/           admin workspace and metrics
    auth/confirm/    email confirmation route
  components/        brand primitives, shell, and per-role UI
  lib/
    config.ts        DEMO_MODE flag
    types.ts         domain types (mirror the Postgres schema)
    data/queries.ts  data-access seam (mock now, Supabase later)
    mock/            seeded demo dataset
    match.ts         the match indicator scoring
    supabase/        @supabase/ssr clients (browser, server, admin) + proxy helper
  proxy.ts           Next 16 proxy (renamed from middleware): session + role guards
supabase/migrations/ ordered SQL (schema, RLS, functions)
```

## House rules

British English throughout, no em dashes, and no red anywhere: warning and destructive states use clay (a warm brown). Certified and paid states use brass and ivy.
