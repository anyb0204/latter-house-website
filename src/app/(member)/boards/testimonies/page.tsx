import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BoardThread } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const threads = [
  { title: "God restored my relationship with my daughter", author: "Susan M.", replies: 45, lastActive: "2 hours ago", pinned: true },
  { title: "From fear to faith — my career transition story", author: "David R.", replies: 32, lastActive: "Today" },
  { title: "How neuroscience exercises changed my prayer life", author: "Helen R.", replies: 28, lastActive: "Yesterday" },
  { title: "Published my first book at 72!", author: "James W.", replies: 51, lastActive: "2 days ago" },
];

export default function TestimoniesBoardPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomSubPage room={room} title="Testimonies" subtitle="Stories of transformation">
      <button className="mb-6 px-6 py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-colors">
        + Share Your Testimony
      </button>
      <div className="space-y-3">
        {threads.map((t) => (
          <BoardThread key={t.title} {...t} />
        ))}
      </div>
    </RoomSubPage>
  );
}
