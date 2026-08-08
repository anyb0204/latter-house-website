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
### What this project is
`latter-house-life` is a **Next.js 14 (App Router)** web app for a faith community. Stack:
- **Auth:** Clerk (`@clerk/nextjs` v5.7.x) — wraps the whole app via `ClerkProvider` and `clerkMiddleware`.
- **Database:** Neon Postgres accessed through Drizzle ORM using the **serverless HTTP driver** (`@neondatabase/serverless` + `drizzle-orm/neon-http`).
- **Optional:** Stripe and OpenAI (features are disabled when their keys are unset).

Ignore `app.js`, `run.sh`, `requirements.txt`, and `planner.html` at the repo root — they are stale/unused artifacts (e.g. `app.js` is a bash stub, `requirements.txt` is Python). The real app is the Next.js project defined by `package.json`.

### Commands (single service)
- Dev server: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- DB: `npm run db:generate` / `npm run db:migrate` / `npm run db:seed`

### Environment variables
Copy `.env.example` to `.env.local`. The app needs `DATABASE_URL` (Neon) and Clerk keys
(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`). These are
external SaaS credentials and must be supplied as secrets.

### Non-obvious caveats (important)
- **Clerk gates every route.** `clerkMiddleware` requires a valid `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  on *every* request — including the "public" routes (`/`, `/about`, `/join`). With no/invalid key, all
  routes return **HTTP 500** (`Missing publishableKey`). This Clerk version has **no keyless mode**, so a
  real key is mandatory just to render the landing page.
- **Live browser needs the Clerk frontend API.** With dev keys, loading any page in a real browser triggers
  Clerk's "handshake" redirect to the frontend API host (`*.clerk.accounts.dev`). That host must be reachable
  or the browser dead-ends (curl/SSR still returns 200 because it doesn't follow the handshake).
- **`next build` requires a reachable `DATABASE_URL`.** `src/lib/db/index.ts` calls `neon()` at module load,
  and the build's "Collecting page data" step imports the API route modules, so the build fails without
  `DATABASE_URL`. The **dev server boots fine without it** (modules load lazily per request; only DB-backed
  requests fail).
- **`drizzle-kit` does not read `.env.local`.** `db:migrate` / `db:generate` only pick up `.env` or the real
  process env. Run them with `DATABASE_URL` exported inline, e.g.
  `DATABASE_URL="postgres://..." npm run db:migrate`.
- **`autoprefixer`** is required by `postcss.config.js` for Tailwind CSS compilation (added to
  `devDependencies`; installed by `npm ci`).

### Network egress (cloud environment)
By default the cloud VM's egress allowlist **blocks `clerk.com`, `*.clerk.accounts.dev`, `api.clerk.com`,
and `*.neon.tech`**. Auth and database access (and therefore any signed-in / DB-backed flow, plus
`next build` and `db:migrate` from the VM) will fail until these domains are allowlisted. General internet
and the npm registry are reachable.
