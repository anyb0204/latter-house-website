# AGENTS.md

## Cursor Cloud specific instructions

"Latter House Life" is a **Next.js 14 (App Router)** app using Clerk auth and a Neon PostgreSQL database via Drizzle ORM.

### Environment
- Use **npm** (`package-lock.json`). The startup update script runs `npm install`. Node 22 works.
- A local **PostgreSQL 16** is installed: start with `sudo pg_ctlcluster 16 main start`. Local dev DB convention: `postgresql://dev:dev@127.0.0.1:5432/latter_house`.
- Create `.env.local` (gitignored) with at least `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY`.

### Database caveat (important)
The app connects with `@neondatabase/serverless`, which speaks Neon's HTTP/WebSocket protocol — it does **not** work against a plain local Postgres, so `npm run db:migrate` and runtime DB queries fail unless you point `DATABASE_URL` at a real Neon database. To get the schema into a local Postgres for inspection, apply the SQL directly: `psql "$DATABASE_URL" -f drizzle/0000_common_chat.sql`.

### Run (development)
- `npm run dev` (port 3000). Public pages (`/`, `/about`) render server-side; protected routes (e.g. `/dashboard`) return `307` → `/sign-in` via Clerk middleware.
- The **browser UI needs a REAL Clerk publishable key** — with a placeholder key the client Clerk handshake redirects to the live Clerk domain and the browser shows a blank page, even though the server-rendered HTML is complete.

### Lint / typecheck / build
- `npm run lint`, `npm run typecheck`, `npm run build` all pass.
- `autoprefixer` is a required devDependency (referenced by `postcss.config.js`); it is declared in `package.json` and needed for both `next dev` and `next build` CSS processing.

### Repo note
The root files `run.sh`, `app.js`, `requirements.txt`, and `planner.html` are an unrelated, misnamed Flask/SQLite prototype and are **not** part of the Next.js app (there is no `app.py`). Ignore them for normal development.
