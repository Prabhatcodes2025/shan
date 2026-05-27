create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create table if not exists public.site_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'site_content'
  ) then
    alter publication supabase_realtime add table public.site_content;
  end if;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on public.site_content;

create trigger site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

grant select on public.site_content to anon;
grant select, insert, update on public.site_content to authenticated;
grant all on public.site_content to service_role;

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "Approved admins can insert site content" on public.site_content;
create policy "Approved admins can insert site content"
on public.site_content
for insert
to authenticated
with check (public.is_admin_user());

drop policy if exists "Approved admins can update site content" on public.site_content;
create policy "Approved admins can update site content"
on public.site_content
for update
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

insert into public.site_content (key, content)
values (
  'main',
  $json$
  {
    "announcements": [
      {
        "date": "May 2026",
        "category": "Service Update",
        "title": "Multilingual AI data support now available as a standalone service line.",
        "summary": "Clients can now engage SG for multilingual annotation and evaluation support."
      },
      {
        "date": "April 2026",
        "category": "Operations",
        "title": "New premium review framework introduced for high-visibility client launches.",
        "summary": "A tighter review flow now supports executive and launch-critical content."
      },
      {
        "date": "March 2026",
        "category": "Growth",
        "title": "Delivery support expanded for cross-region language programs.",
        "summary": "Our delivery model now better supports multi-region language programs."
      }
    ],
    "careers": {
      "heroTitle": "Join a team building multilingual operations.",
      "heroDescription": "Work across translation, QA, and AI data projects.",
      "workingStyle": "We value clarity, ownership, and steady execution.",
      "growthEyebrow": "Growth",
      "growthTitle": "Small team, clear responsibility.",
      "growthDescription": "Build practical skills through real client work.",
      "cultureEyebrow": "Culture",
      "cultureTitle": "Calm, focused, accountable.",
      "cultureDescription": "We care about quality, teamwork, and consistency.",
      "rolesEyebrow": "Open Roles",
      "rolesTitle": "Current openings.",
      "rolesDescription": "Explore active roles across operations and language support.",
      "benefits": [
        "Clear ownership",
        "Hands-on workflow learning",
        "Fast collaboration",
        "Client-facing experience"
      ],
      "roles": [
        {
          "title": "Localization Project Coordinator",
          "type": "Full Time",
          "location": "Remote / India",
          "summary": "Coordinate schedules, reviews, and multilingual delivery flow."
        },
        {
          "title": "Language Quality Reviewer",
          "type": "Contract",
          "location": "Multi-language",
          "summary": "Review multilingual content for tone, consistency, and quality."
        },
        {
          "title": "AI Data Operations Associate",
          "type": "Full Time",
          "location": "Hybrid",
          "summary": "Support multilingual annotation and evaluation programs for AI teams."
        }
      ]
    }
  }
  $json$::jsonb
)
on conflict (key) do nothing;

-- After you create an Auth user in Supabase, add that user here:
-- insert into public.admin_users (user_id, email)
-- values ('00000000-0000-0000-0000-000000000000', 'admin@yourcompany.com')
-- on conflict (user_id) do update set email = excluded.email;
