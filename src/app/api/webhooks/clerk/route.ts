import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface ClerkEmailAddress {
  email_address: string;
  id: string;
}

interface ClerkUserCreatedEvent {
  type: "user.created" | "user.updated";
  data: {
    id: string;
    email_addresses: ClerkEmailAddress[];
    first_name?: string;
    last_name?: string;
  };
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: ClerkUserCreatedEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id: clerkUserId, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address ?? "";
    const displayName = [first_name, last_name].filter(Boolean).join(" ") || email.split("@")[0];

    await db
      .insert(users)
      .values({
        clerkUserId,
        email,
        displayName,
        role: "member",
      })
      .onConflictDoUpdate({
        target: users.clerkUserId,
        set: {
          email,
          displayName,
        },
      });
  }

  return new Response("OK", { status: 200 });
}
