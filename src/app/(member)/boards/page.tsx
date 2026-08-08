import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function BoardsPage() {
  const room = getRoomById("boards")!;
  return (
    <RoomHubPage
      room={room}
      intro="Meaningful conversations that build faith. Join discussions, share prayer needs, and connect with study groups."
    />
  );
}
