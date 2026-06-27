-- IBvy migration 0001: profiles, roles, sign-up trigger, and self-access RLS.
-- Applies the auth foundation from the brief, sections 5 and 6.

-- gen_random_uuid() lives in pgcrypto (preinstalled on Supabase, but be safe).
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Role enum
-- ---------------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('teacher', 'school', 'admin');
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- PROFILES (extends auth.users)
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null,
  full_name text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- ---------------------------------------------------------------------------
-- is_admin(): security-definer helper for admin-permissive policies.
-- Defined before the policies that use it. Stable, runs as owner so it can
-- read profiles without tripping the very policies it supports.
-- ---------------------------------------------------------------------------
create or replace function is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Sign-up: create the profile row from auth metadata. Runs as a security
-- definer trigger so it bypasses RLS at the moment of account creation.
-- Role and full_name are passed in raw_user_meta_data by the sign-up action.
-- Defaults to 'teacher' if no role is supplied. Admins are seeded directly,
-- never self-registered, so 'admin' from metadata is downgraded to 'teacher'.
-- ---------------------------------------------------------------------------
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data ->> 'role', 'teacher');
  safe_role user_role;
begin
  if requested_role = 'school' then
    safe_role := 'school';
  else
    safe_role := 'teacher';
  end if;

  insert into profiles (id, role, full_name)
  values (
    new.id,
    safe_role,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS policies for profiles
-- ---------------------------------------------------------------------------
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_admin_all" on profiles;
create policy "profiles_admin_all" on profiles
  for all using (is_admin()) with check (is_admin());
