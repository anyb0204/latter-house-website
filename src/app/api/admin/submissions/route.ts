import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { articleSubmissions, videoSubmissions, bookSubmissions, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [articles, videos, books] = await Promise.all([
    db
      .select({ id: articleSubmissions.id, title: articleSubmissions.title, detail: articleSubmissions.content, status: articleSubmissions.status, createdAt: articleSubmissions.createdAt, userName: users.displayName })
      .from(articleSubmissions)
      .leftJoin(users, eq(articleSubmissions.userId, users.id))
      .orderBy(desc(articleSubmissions.createdAt)),
    db
      .select({ id: videoSubmissions.id, title: videoSubmissions.title, detail: videoSubmissions.url, status: videoSubmissions.status, createdAt: videoSubmissions.createdAt, userName: users.displayName })
      .from(videoSubmissions)
      .leftJoin(users, eq(videoSubmissions.userId, users.id))
      .orderBy(desc(videoSubmissions.createdAt)),
    db
      .select({ id: bookSubmissions.id, title: bookSubmissions.title, detail: bookSubmissions.author, status: bookSubmissions.status, createdAt: bookSubmissions.createdAt, userName: users.displayName })
      .from(bookSubmissions)
      .leftJoin(users, eq(bookSubmissions.userId, users.id))
      .orderBy(desc(bookSubmissions.createdAt)),
  ]);

  const combined = [
    ...articles.map((r) => ({ ...r, type: "article" as const })),
    ...videos.map((r) => ({ ...r, type: "video" as const })),
    ...books.map((r) => ({ ...r, type: "book" as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(combined);
}
