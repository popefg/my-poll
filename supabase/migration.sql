-- Cedar Bites: votes table, RLS policies, and Realtime setup.
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  dish text not null check (dish in ('hummus', 'tabbouleh', 'kibbeh', 'fattoush', 'manakish')),
  created_at timestamptz default now()
);

alter table votes enable row level security;

create policy "Anyone can vote"
  on votes for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can read results"
  on votes for select
  to anon, authenticated
  using (true);

-- Enable Realtime (Postgres changes) on the votes table.
alter publication supabase_realtime add table votes;
