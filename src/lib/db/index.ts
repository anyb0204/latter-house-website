import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getConnectionString } from "@netlify/database";
import * as schema from "./schema";

function resolveConnectionString(): string {
  // Provisioned automatically by Netlify (production + per-branch preview
  // databases) when @netlify/database is installed -- no manual setup.
  try {
    const netlifyConnectionString = getConnectionString();
    if (netlifyConnectionString) return netlifyConnectionString;
  } catch {
    // Not running in a Netlify context (e.g. a local build outside
    // `netlify dev`) -- fall through to DATABASE_URL below.
  }

  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  console.warn(
    "[DB] No database connection available (Netlify DB not provisioned and DATABASE_URL is not set). Database operations will fail at runtime."
  );
  return "postgresql://build:build@localhost:5432/build?sslmode=disable";
}

const sql = neon(resolveConnectionString());
export const db = drizzle(sql, { schema });
