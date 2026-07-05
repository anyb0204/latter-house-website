import { getCurrentUser } from "@/lib/auth/helpers";
import { db } from "@/lib/db";
import { announcements, brainstormPrompts } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import Card from "@/components/ui/Card";
import Link from "next/link";
import DashboardNav, { DashboardRoomGrid } from "@/components/layout/DashboardNav";
import VideoBackground from "@/components/ui/VideoBackground";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  let latestAnnouncements: typeof announcements.$inferSelect[] = [];
  let prompts: typeof brainstormPrompts.$inferSelect[] = [];

  try {
    [latestAnnouncements, prompts] = await Promise.all([
      db.select().from(announcements).orderBy(desc(announcements.createdAt)).limit(3),
      db.select().from(brainstormPrompts).where(and(eq(brainstormPrompts.isActive, true))).orderBy(brainstormPrompts.sortOrder).limit(3),
    ]);
  } catch {
    // Database may not be configured in dev
  }

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-cream">
      <DashboardNav />

      {/* Welcome banner */}
      <VideoBackground
        src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4"
        overlay="medium"
        className="min-h-[220px] flex items-end"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-8 pt-6">
          <p className="text-champagne text-body-base mb-1">{greeting}</p>
          <h1 className="font-serif text-display-md text-white font-semibold">
            {user?.displayName ? `Welcome, ${user.displayName}` : "Welcome to Your Sanctuary"}
          </h1>
          <p className="text-white/80 text-body-lg mt-2 max-w-2xl">
            Choose a room below to begin today&apos;s journey. Hover for quick options.
          </p>
        </div>
      </VideoBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { href: "/devotionals/today", label: "Today's Devotional", icon: "✦" },
            { href: "/opportunities", label: "Opportunities", icon: "✨" },
            { href: "/praise-reports", label: "Share Praise", icon: "🙏" },
            { href: "/submit/article", label: "Submit Article", icon: "📝" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-sage/15 hover:border-champagne hover:shadow-md transition-all"
            >
              <span className="text-xl" aria-hidden>{item.icon}</span>
              <span className="text-body-sm font-medium text-forest">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Room grid */}
        <div className="mb-12">
          <h2 className="font-serif text-heading-md text-forest font-semibold mb-2">
            Your Rooms
          </h2>
          <p className="text-body-sm text-forest/55 mb-6">
            Hover over any room to see quick options, or click to enter.
          </p>
          <DashboardRoomGrid />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {latestAnnouncements.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-heading-sm text-forest font-semibold">Announcements</h2>
                <Link href="/announcements" className="text-sage text-body-sm hover:text-forest">View all →</Link>
              </div>
              <div className="space-y-3">
                {latestAnnouncements.map((a) => (
                  <Card key={a.id} padding="sm">
                    <p className="font-semibold text-forest text-body-base">{a.title}</p>
                    <p className="text-body-sm text-forest/60 mt-1 line-clamp-2">{a.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {prompts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-heading-sm text-forest font-semibold">Forward Motion</h2>
                <Link href="/brainstorm" className="text-sage text-body-sm hover:text-forest">See more →</Link>
              </div>
              <div className="space-y-2">
                {prompts.map((p) => (
                  <div key={p.id} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-sage/15">
                    <span className="text-champagne mt-0.5" aria-hidden>✦</span>
                    <p className="text-forest/75 text-body-sm">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Daily blessing */}
        <div className="mt-12 text-center glass-card p-8">
          <p className="font-serif text-heading-sm text-forest italic mb-2">
            &ldquo;May you leave today refreshed, renewed, inspired, informed, and equipped
            for the day ahead.&rdquo;
          </p>
          <p className="text-body-sm text-forest/50">— Your Latter House family</p>
        </div>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
