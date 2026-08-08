# AGENTS.md

## Cursor Cloud specific instructions

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
