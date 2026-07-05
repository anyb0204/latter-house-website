import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BoardThread } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const threads = [
  { title: "The Latter House — Chapter 3 Discussion", author: "Book Club Leader", replies: 56, lastActive: "2 hours ago", pinned: true },
  { title: "Romans Study Group — Week 4", author: "James W.", replies: 12, lastActive: "Today" },
  { title: "Neuroscience & Faith — Group Reflections", author: "Grace T.", replies: 8, lastActive: "Yesterday" },
  { title: "Haggai Deep Dive — Building the Temple", author: "Robert K.", replies: 21, lastActive: "2 days ago" },
];

export default function StudyBoardPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomSubPage room={room} title="Study Groups" subtitle="Book and Bible discussions">
      <div className="space-y-3">
        {threads.map((t) => (
          <BoardThread key={t.title} {...t} />
        ))}
      </div>
    </RoomSubPage>
  );
}
