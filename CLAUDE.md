# Latter House Planner — Claude Instructions

## Project Overview

A personal life-planning web app built with Flask (Python) and a single-page HTML/JS frontend. Features daily, weekly, monthly, and yearly calendar views with linked navigation, plus trackers for medication, health appointments, symptoms, finances, grocery lists, and business activity. Rooted in faith and personal stewardship.

**Stack:** Python 3 / Flask · SQLite · Vanilla JS · Single HTML template

**Key files:**
- `app.py` — Flask backend, auth, and API routes
- `templates/planner.html` — entire frontend (HTML + CSS + JS)
- `planner.db` — SQLite database (never commit this)
- `archive/` — old Latter House Life standalone app kept for tracker reference

---

## Verification Protocol

### Before starting any task
State out loud how you will verify the work when it is done. Be specific:
- Which pages or flows will you test?
- What inputs will you use?
- What output or behavior confirms success?

### After finishing any task
Run the verification and report the results before closing the task:
1. Start the Flask server (`python app.py` or `bash run.sh`)
2. Use Playwright/Chromium to screenshot the affected views
3. Test the specific interaction that was changed
4. Confirm no visible regressions on the other main views (Today, Week, Month, Year, Trackers)
5. Report: what passed, what was observed, any issues found

If the server cannot start, report the error — do not mark the task complete.

---

## Hot Zones — Ask Before Touching

The following areas require user confirmation before any code changes. When you identify that a task touches a hot zone, stop and explain:
1. What you plan to change
2. The blast radius — what else could break or be affected
3. Wait for explicit approval before proceeding

### Current Hot Zones

| Zone | Path / Area | Why it's sensitive |
|------|------------|-------------------|
| **Authentication** | `app.py` — `/login`, `/setup`, `/logout`, session handling | Locks users out if broken |
| **Database schema** | `app.py` — `init_db()`, any `CREATE TABLE` / `ALTER TABLE` | Data loss or corruption risk |
| **Data persistence API** | `app.py` — `/api/state`, `/api/day-note`, `/api/save-snapshot` | Breaks save/load for all planner data |
| **Password handling** | `app.py` — `generate_password_hash`, `check_password_hash` | Security-critical |
| **Payment (future)** | `payment/` or any Stripe/billing code | Financial and legal risk |

> When in doubt about whether something is a hot zone, ask first.

---

## General Rules

- **Do not commit `planner.db`** — it contains user data
- **Do not rename or restructure files** without confirming first — the Flask template loader and run scripts depend on specific paths
- Prefer editing existing files over creating new ones
- The `archive/` folder is read-only reference — do not modify those files
- All development goes on branch `claude/cool-bohr-ftmfP`; never push directly to `main`
