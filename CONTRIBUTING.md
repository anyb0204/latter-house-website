# Contributing to Latter House Life

Thanks for helping build Latter House Life. This guide covers how to get set up, how the repo is organized, and what's expected in a pull request.

## Project layout

This is a **Next.js 14 (App Router)** application:

- `src/app` — routes and pages
- `src/components` — UI components
- `src/lib` — server/client utilities, integrations
- `src/middleware.ts` — Clerk auth middleware
- `drizzle/` — database migrations (Drizzle ORM against Neon Postgres)
- `netlify/` — Netlify function/config
- `public/` — static assets

## Development setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in the values you need:
   - `DATABASE_URL` — Neon PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET` — Clerk auth
   - `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — optional, omit to disable billing
   - `OPENAI_API_KEY` — optional, omit to disable AI features
   - `NEXT_PUBLIC_APP_URL` — defaults to `http://localhost:3000`
3. Apply database migrations:
   ```
   npm run db:generate
   npm run db:migrate
   ```
4. Start the dev server:
   ```
   npm run dev
   ```

## Before opening a pull request

- Run `npm run typecheck` and fix any type errors your change introduces.
- Run `npm run lint` and resolve warnings/errors in files you touched.
- Run `npm run build` to confirm the app compiles cleanly.
- There is no automated test suite yet — manually exercise the affected page/flow in the browser and describe what you tested in the PR description.
- Never commit real secrets or `.env*` files; only `.env.example` should be checked in, and it must stay free of real values.
- If you change the database schema, include the generated Drizzle migration in `drizzle/` alongside your code change.

## Pull requests

- Give PRs a clear, descriptive title and explain *why* the change is needed, not just what changed.
- Link any related issue.
- Keep PRs focused; prefer several small PRs over one large one when the work is separable.
- Include screenshots or a short clip for UI changes.

## Reporting issues

Open a GitHub issue with steps to reproduce, expected vs. actual behavior, and environment details (browser, OS). Do not include real credentials or personal data in issue reports.
