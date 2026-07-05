import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function CommunityPage() {
  const room = getRoomById("community")!;
  return (
    <RoomHubPage
      room={room}
      intro="Walk alongside fellow believers who understand the journey. Share, connect, pray, and celebrate together."
    />
  );
}
