import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const prompts = [
    {
      text: "Call and minister to a friend today",
      category: "ministry",
      sortOrder: 1,
    },
    {
      text: "Contact a church secretary about ministry opportunities",
      category: "ministry",
      sortOrder: 2,
    },
    {
      text: "Write down one thing you're grateful for and share it",
      category: "gratitude",
      sortOrder: 3,
    },
    {
      text: "Do one practical thing today that creates forward motion",
      category: "action",
      sortOrder: 4,
    },
    {
      text: "Reach out to someone you haven't spoken to in a while",
      category: "community",
      sortOrder: 5,
    },
    {
      text: "Spend 15 minutes in quiet reflection or prayer",
      category: "spiritual",
      sortOrder: 6,
    },
    {
      text: "Identify one skill you can offer to serve your community",
      category: "service",
      sortOrder: 7,
    },
    {
      text: "Read one passage of scripture and journal your thoughts",
      category: "spiritual",
      sortOrder: 8,
    },
    {
      text: "Send an encouraging message to someone in your network",
      category: "community",
      sortOrder: 9,
    },
    {
      text: "Take one concrete step toward a goal you've been postponing",
      category: "action",
      sortOrder: 10,
    },
  ];

  console.log("Seeding brainstorm prompts...");
  for (const prompt of prompts) {
    await db
      .insert(schema.brainstormPrompts)
      .values(prompt)
      .onConflictDoNothing();
  }
  console.log(`Seeded ${prompts.length} brainstorm prompts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
