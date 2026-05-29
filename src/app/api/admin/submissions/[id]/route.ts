import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { articleSubmissions, videoSubmissions, bookSubmissions, moderationLog } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const { action, submissionType } = await req.json();

  if (!["approve", "decline"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "approved" : "declined";
  const numId = Number(id);

  let updated;
  if (submissionType === "article") {
    const [row] = await db
      .update(articleSubmissions)
      .set({ status: newStatus, reviewedAt: new Date(), reviewedBy: admin.id })
      .where(eq(articleSubmissions.id, numId))
      .returning();
    updated = row;
  } else if (submissionType === "video") {
    const [row] = await db
      .update(videoSubmissions)
      .set({ status: newStatus, reviewedAt: new Date(), reviewedBy: admin.id })
      .where(eq(videoSubmissions.id, numId))
      .returning();
    updated = row;
  } else if (submissionType === "book") {
    const [row] = await db
      .update(bookSubmissions)
      .set({ status: newStatus, reviewedAt: new Date(), reviewedBy: admin.id })
      .where(eq(bookSubmissions.id, numId))
      .returning();
    updated = row;
  } else {
    return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
  }

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.insert(moderationLog).values({
    adminId: admin.id,
    action: newStatus,
    targetType: `${submissionType}_submission`,
    targetId: numId,
    notes: "",
  });

  return NextResponse.json(updated);
}
