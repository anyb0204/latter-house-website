import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://build:build@localhost:5432/build?sslmode=disable";

if (!process.env.DATABASE_URL) {
  console.warn(
    "[DB] DATABASE_URL is not set. Database operations will fail at runtime."
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
