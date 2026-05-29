import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { opportunities, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rows = await db
    .select({
      id: opportunities.id,
      title: opportunities.title,
      description: opportunities.description,
      type: opportunities.type,
      status: opportunities.status,
      createdAt: opportunities.createdAt,
      userName: users.displayName,
    })
    .from(opportunities)
    .leftJoin(users, eq(opportunities.userId, users.id))
    .orderBy(desc(opportunities.createdAt));

  return NextResponse.json(rows);
}
