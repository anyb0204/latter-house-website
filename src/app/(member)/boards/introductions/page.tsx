import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BoardThread } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const threads = [
  { title: "Hello from Portland! Excited to be here", author: "NewMember42", replies: 12, lastActive: "1 hour ago" },
  { title: "Retired teacher looking to connect", author: "Margaret T.", replies: 8, lastActive: "3 hours ago" },
  { title: "Just finished the book — mind blown!", author: "James W.", replies: 15, lastActive: "Today" },
  { title: "Empty nester seeking community", author: "Robert & Linda", replies: 9, lastActive: "Yesterday" },
];

export default function IntroductionsBoardPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomSubPage room={room} title="Introductions" subtitle="Welcome new members to the family">
      <p className="text-body-base text-forest/65 mb-6">
        New here? Introduce yourself! Tell us your name, where you&apos;re from, and what brought you to Latter House Life.
      </p>
      <div className="space-y-3">
        {threads.map((t) => (
          <BoardThread key={t.title} {...t} />
        ))}
      </div>
    </RoomSubPage>
  );
}
