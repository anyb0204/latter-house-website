import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function DevotionalsPage() {
  const room = getRoomById("devotionals")!;
  return (
    <RoomHubPage
      room={room}
      intro="Begin each day in peace with scripture, prayer, worship, and reflection — designed to renew your mind and prepare your heart."
    />
  );
}
