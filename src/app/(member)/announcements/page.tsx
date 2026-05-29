import { db } from "@/lib/db";
import { announcements, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Card from "@/components/ui/Card";

export default async function AnnouncementsPage() {
  const rows = await db
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

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Announcements</h1>
      <p className="text-gray-600 mb-8">Stay up to date with community news and updates.</p>

      {rows.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">No announcements yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {rows.map((a) => (
            <Card key={a.id}>
              <h2 className="font-serif text-xl text-forest font-semibold mb-2">{a.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{a.body}</p>
              <p className="text-xs text-gray-400 mt-4">
                {a.authorName && `By ${a.authorName} · `}
                {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
