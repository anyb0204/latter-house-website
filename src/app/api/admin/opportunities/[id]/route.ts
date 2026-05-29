import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { opportunities, moderationLog } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const { action } = await req.json();

  if (!["approve", "decline"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "approved" : "declined";

  const [updated] = await db
    .update(opportunities)
    .set({ status: newStatus, reviewedAt: new Date(), reviewedBy: admin.id })
    .where(eq(opportunities.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.insert(moderationLog).values({
    adminId: admin.id,
    action: newStatus,
    targetType: "opportunity",
    targetId: Number(id),
    notes: "",
  });

  return NextResponse.json(updated);
}
