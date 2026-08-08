import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BoardThread } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const threads = [
  { title: "Prayer for healing — my mother's recovery", author: "Linda K.", replies: 47, lastActive: "1 hour ago", pinned: true },
  { title: "Job search at 60 — need encouragement", author: "David R.", replies: 23, lastActive: "3 hours ago" },
  { title: "Family reconciliation — please pray", author: "Anonymous", replies: 38, lastActive: "5 hours ago" },
  { title: "Strength for caregiving season", author: "Patricia L.", replies: 16, lastActive: "Today" },
];

export default function PrayerBoardPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomSubPage room={room} title="Prayer Requests" subtitle="Share needs and intercede for one another">
      <button className="mb-6 px-6 py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-colors">
        + Share Prayer Request
      </button>
      <div className="space-y-3">
        {threads.map((t) => (
          <BoardThread key={t.title} {...t} />
        ))}
      </div>
    </RoomSubPage>
  );
}
