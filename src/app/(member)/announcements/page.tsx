import { db } from "@/lib/db";
import { announcements, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Card from "@/components/ui/Card";
import MemberPageLayout from "@/components/layout/MemberPageLayout";

export default async function AnnouncementsPage() {
  let rows: {
    id: number;
    title: string;
    body: string;
    publishedAt: Date | null;
    createdAt: Date;
    authorName: string | null;
  }[] = [];

  try {
    rows = await db
      .select({
        id: announcements.id,
        title: announcements.title,
        body: announcements.body,
        publishedAt: announcements.publishedAt,
        createdAt: announcements.createdAt,
        authorName: users.displayName,
      })
      .from(announcements)
      .leftJoin(users, eq(announcements.authorId, users.id))
      .orderBy(desc(announcements.createdAt));
  } catch {
    // Database may not be configured
  }

  return (
    <MemberPageLayout
      title="Announcements"
      subtitle="Stay up to date with community news and updates."
    >
      {rows.length === 0 ? (
        <Card>
          <p className="text-forest/50 text-center py-8">No announcements yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {rows.map((a) => (
            <Card key={a.id}>
              <h2 className="font-serif text-heading-sm text-forest font-semibold mb-2">{a.title}</h2>
              <p className="text-body-base text-forest/75 whitespace-pre-wrap">{a.body}</p>
              <p className="text-body-sm text-forest/40 mt-4">
                {a.authorName && `By ${a.authorName} · `}
                {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </MemberPageLayout>
  );
}
