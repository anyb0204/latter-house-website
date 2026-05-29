import { db } from "@/lib/db";
import { praiseReports, opportunities, articleSubmissions, videoSubmissions, bookSubmissions, moderationLog, users } from "@/lib/db/schema";
import { eq, count, desc } from "drizzle-orm";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    pendingPraise,
    pendingOpps,
    pendingArticles,
    pendingVideos,
    pendingBooks,
    recentLogs,
  ] = await Promise.all([
    db.select({ count: count() }).from(praiseReports).where(eq(praiseReports.status, "pending")),
    db.select({ count: count() }).from(opportunities).where(eq(opportunities.status, "pending")),
    db.select({ count: count() }).from(articleSubmissions).where(eq(articleSubmissions.status, "pending")),
    db.select({ count: count() }).from(videoSubmissions).where(eq(videoSubmissions.status, "pending")),
    db.select({ count: count() }).from(bookSubmissions).where(eq(bookSubmissions.status, "pending")),
    db
      .select({
        id: moderationLog.id,
        action: moderationLog.action,
        targetType: moderationLog.targetType,
        notes: moderationLog.notes,
        createdAt: moderationLog.createdAt,
        adminName: users.displayName,
      })
      .from(moderationLog)
      .leftJoin(users, eq(moderationLog.adminId, users.id))
      .orderBy(desc(moderationLog.createdAt))
      .limit(5),
  ]);

  const totalPendingSubmissions =
    (pendingArticles[0]?.count ?? 0) + (pendingVideos[0]?.count ?? 0) + (pendingBooks[0]?.count ?? 0);

  const stats = [
    { label: "Pending Praise Reports", count: pendingPraise[0]?.count ?? 0, href: "/admin/praise-reports", color: "border-green-300" },
    { label: "Pending Opportunities", count: pendingOpps[0]?.count ?? 0, href: "/admin/opportunities", color: "border-blue-300" },
    { label: "Pending Submissions", count: totalPendingSubmissions, href: "/admin/submissions", color: "border-purple-300" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Overview of pending items and recent activity.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className={`border-l-4 ${stat.color} hover:shadow-md transition-shadow`}>
              <p className="text-3xl font-bold text-forest">{stat.count}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="font-serif text-xl text-forest font-semibold mb-4">Recent Activity</h2>
      {recentLogs.length === 0 ? (
        <Card><p className="text-gray-500 text-center py-4">No moderation activity yet.</p></Card>
      ) : (
        <div className="space-y-2">
          {recentLogs.map((log) => (
            <Card key={log.id} padding="sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-forest text-sm">{log.action}</span>
                  <span className="text-gray-500 text-sm"> on {log.targetType}</span>
                  {log.notes && <span className="text-gray-500 text-sm"> — {log.notes}</span>}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{log.adminName}</p>
                  <p className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
