import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

const [existing] = await db
  .select()
  .from(users)
  .where(eq(users.clerkUserId, userId))
  .limit(1);

if (existing) return existing;

// No DB row yet (e.g. webhook hasn't fired). Create it from the Clerk session
// so a freshly signed-in user isn't bounced back to sign-in (avoids redirect loop).
const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
  const displayName =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    email.split("@")[0] ||
    "";

await db
  .insert(users)
  .values({ clerkUserId: userId, email, displayName })
  .onConflictDoNothing({ target: users.clerkUserId });

const [created] = await db
  .select()
  .from(users)
  .where(eq(users.clerkUserId, userId))
  .limit(1);

return created ?? null;
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
