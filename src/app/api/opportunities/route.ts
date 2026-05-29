import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { opportunities } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const approved = req.nextUrl.searchParams.get("approved") === "true";

  if (approved) {
    const rows = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.status, "approved"))
      .orderBy(desc(opportunities.createdAt));
    return NextResponse.json(rows);
  }

  const rows = await db
    .select()
    .from(opportunities)
    .where(eq(opportunities.userId, user.id))
    .orderBy(desc(opportunities.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, type } = await req.json();
  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  const validTypes = ["job", "volunteer", "mission", "other"];
  const oppType = validTypes.includes(type) ? type : "other";

  const [row] = await db
    .insert(opportunities)
    .values({ userId: user.id, title: title.trim(), description: description.trim(), type: oppType })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
