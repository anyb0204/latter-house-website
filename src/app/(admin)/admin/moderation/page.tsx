import { db } from "@/lib/db";
import { moderationLog, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Card from "@/components/ui/Card";

export default async function ModerationLogPage() {
  const logs = await db
    .select({
      id: moderationLog.id,
      action: moderationLog.action,
      targetType: moderationLog.targetType,
      targetId: moderationLog.targetId,
      notes: moderationLog.notes,
      createdAt: moderationLog.createdAt,
      adminName: users.displayName,
      adminEmail: users.email,
    })
    .from(moderationLog)
    .leftJoin(users, eq(moderationLog.adminId, users.id))
    .orderBy(desc(moderationLog.createdAt));

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Moderation Log</h1>
      <p className="text-gray-600 mb-8">Full history of all moderation actions taken by admins.</p>

      {logs.length === 0 ? (
        <Card><p className="text-gray-500 text-center py-8">No moderation actions yet.</p></Card>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <Card key={log.id} padding="sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-medium text-forest">{log.action}</span>
                  <span className="text-gray-500"> on </span>
                  <span className="text-gray-700 font-medium">{log.targetType} #{log.targetId}</span>
                  {log.notes && (
                    <p className="text-sm text-gray-500 mt-0.5">{log.notes}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-gray-700">{log.adminName ?? log.adminEmail}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
