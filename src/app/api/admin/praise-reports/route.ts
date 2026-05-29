import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { praiseReports, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rows = await db
    .select({
      id: praiseReports.id,
      content: praiseReports.content,
      status: praiseReports.status,
      createdAt: praiseReports.createdAt,
      reviewedAt: praiseReports.reviewedAt,
      userName: users.displayName,
    })
    .from(praiseReports)
    .leftJoin(users, eq(praiseReports.userId, users.id))
    .orderBy(desc(praiseReports.createdAt));

  return NextResponse.json(rows);
}
