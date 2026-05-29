import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { announcements, brainstormPrompts } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const [latestAnnouncements, prompts] = await Promise.all([
    db
      .select()
      .from(announcements)
      .orderBy(desc(announcements.createdAt))
      .limit(3),
    db
      .select()
      .from(brainstormPrompts)
      .where(and(eq(brainstormPrompts.isActive, true)))
      .orderBy(brainstormPrompts.sortOrder)
      .limit(3),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">
        Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
      </h1>
      <p className="text-gray-600 mb-8">Here&apos;s what&apos;s happening in your community today.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/praise-reports", label: "Share a Praise", icon: "🙏", color: "bg-green-50 border-green-200" },
          { href: "/opportunities", label: "Browse Opportunities", icon: "✨", color: "bg-blue-50 border-blue-200" },
          { href: "/journal", label: "Open Journal", icon: "📓", color: "bg-amber-50 border-amber-200" },
          { href: "/brainstorm", label: "Get Inspired", icon: "💡", color: "bg-purple-50 border-purple-200" },
          { href: "/submit/article", label: "Submit Article", icon: "📝", color: "bg-rose-50 border-rose-200" },
          { href: "/announcements", label: "Announcements", icon: "📢", color: "bg-teal-50 border-teal-200" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-transform hover:scale-105 ${item.color}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium text-gray-700">{item.label}</span>
          </Link>
        ))}
      </div>

      {latestAnnouncements.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-forest font-semibold">Recent Announcements</h2>
            <Link href="/announcements" className="text-sage text-sm hover:text-forest">View all →</Link>
          </div>
          <div className="space-y-3">
            {latestAnnouncements.map((a) => (
              <Card key={a.id} padding="sm">
                <p className="font-semibold text-forest">{a.title}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{a.body}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {prompts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-forest font-semibold">Forward Motion Ideas</h2>
            <Link href="/brainstorm" className="text-sage text-sm hover:text-forest">See more →</Link>
          </div>
          <div className="space-y-2">
            {prompts.map((p) => (
              <div key={p.id} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-mint/30">
                <span className="text-gold mt-0.5">✦</span>
                <p className="text-gray-700 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
