import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { articleSubmissions, videoSubmissions, bookSubmissions } from "@/lib/db/schema";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { type } = body;

  if (type === "article") {
    const { title, content } = body;
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }
    const [row] = await db
      .insert(articleSubmissions)
      .values({ userId: user.id, title: title.trim(), content: content.trim() })
      .returning();
    return NextResponse.json(row, { status: 201 });
  }

  if (type === "video") {
    const { title, url, description } = body;
    if (!title?.trim() || !url?.trim()) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }
    const [row] = await db
      .insert(videoSubmissions)
      .values({ userId: user.id, title: title.trim(), url: url.trim(), description: description?.trim() ?? "" })
      .returning();
    return NextResponse.json(row, { status: 201 });
  }

  if (type === "book") {
    const { title, author, reason } = body;
    if (!title?.trim() || !author?.trim()) {
      return NextResponse.json({ error: "Title and author are required" }, { status: 400 });
    }
    const [row] = await db
      .insert(bookSubmissions)
      .values({ userId: user.id, title: title.trim(), author: author.trim(), reason: reason?.trim() ?? "" })
      .returning();
    return NextResponse.json(row, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
}
