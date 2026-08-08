import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BoardThread } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const threads = [
  { title: "What does 'the latter house' mean to you?", author: "Helen R.", replies: 34, lastActive: "2 hours ago", pinned: true },
  { title: "Favorite scripture for this season", author: "Michael T.", replies: 28, lastActive: "4 hours ago" },
  { title: "How do you start your mornings?", author: "Dorothy S.", replies: 19, lastActive: "6 hours ago" },
  { title: "Neuroscience exercise experiences", author: "Frank B.", replies: 15, lastActive: "Yesterday" },
  { title: "Books that changed your thinking", author: "Susan M.", replies: 42, lastActive: "Yesterday" },
];

export default function GeneralBoardPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomSubPage room={room} title="General Discussion" subtitle="Open conversations for the community">
      <button className="mb-6 px-6 py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-colors">
        + Start New Discussion
      </button>
      <div className="space-y-3">
        {threads.map((t) => (
          <BoardThread key={t.title} {...t} />
        ))}
      </div>
    </RoomSubPage>
  );
}
