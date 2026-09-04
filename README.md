# Cedar Bites 🌲

A live poll for Lebanon's favorite dish — vote once per browser, watch results
update in real time for everyone.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS, Supabase
(Postgres + Realtime), deployed on Vercel.

## How it works

- Pick one of 5 dishes (Hummus, Tabbouleh, Kibbeh, Fattoush, Manakish) on the
  voting screen.
- Your vote is inserted into a `votes` table in Supabase and your browser is
  flagged in `localStorage` so you can't vote again from the same browser
  (client-side only — it's a fun poll, not secure auth).
- The results screen subscribes to Supabase Realtime (`postgres_changes` on
  `votes`) and re-tallies live as new votes come in, for every connected
  browser.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project values
npm run dev
```

Open http://localhost:3000.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (or use an
   existing one).
2. Open **SQL Editor** and run the contents of
   [`supabase/migration.sql`](./supabase/migration.sql). It creates the
   `votes` table, enables Row Level Security with public insert/select
   policies, and adds the table to the `supabase_realtime` publication.
3. Confirm Realtime is on: **Database → Replication**, `votes` should be
   listed under the `supabase_realtime` publication (the migration does this
   for you, but it's worth a glance).
4. Grab your **Project URL** and **anon public key** from
   **Project Settings → API** and put them in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this from the
   repo).
2. Import the repo into Vercel.
3. Add the same two environment variables from `.env.local` in
   **Project Settings → Environment Variables** (Production + Preview).
4. Deploy. No build config changes needed — it's a standard Next.js app.

## Project structure

```
src/
  app/page.tsx            # screen switching: vote → results
  components/
    VotingScreen.tsx       # the 5 dish cards
    ResultsScreen.tsx      # animated live bar chart + leader crown
    VoteCard.tsx
    Header.tsx / CedarLogo.tsx
  lib/
    dishes.ts               # the 5 dishes (source of truth)
    supabase.ts              # Supabase client
    voteStorage.ts            # localStorage vote guard
supabase/migration.sql      # table + RLS + Realtime
```

## Live URL

_Add the deployed Vercel URL here once deployed — see notes below._
