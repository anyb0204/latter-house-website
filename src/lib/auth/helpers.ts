import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1);

  return user ?? null;
}

export async function requireRole(role: "member" | "admin") {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  if (role === "admin" && user.role !== "admin") {
    redirect("/dashboard");
  }
  if (role === "member" && user.role === "guest") {
    redirect("/sign-in");
  }
  return user;
}
