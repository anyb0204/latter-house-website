import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { praiseReports } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const approved = req.nextUrl.searchParams.get("approved") === "true";

  if (approved) {
    const rows = await db
      .select()
      .from(praiseReports)
      .where(eq(praiseReports.status, "approved"))
      .orderBy(desc(praiseReports.createdAt));
    return NextResponse.json(rows);
  }

  const rows = await db
    .select()
    .from(praiseReports)
    .where(eq(praiseReports.userId, user.id))
    .orderBy(desc(praiseReports.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const [row] = await db
    .insert(praiseReports)
    .values({ userId: user.id, content: content.trim() })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
