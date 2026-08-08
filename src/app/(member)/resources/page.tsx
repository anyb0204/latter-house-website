import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function ResourcesPage() {
  const room = getRoomById("resources")!;
  return (
    <RoomHubPage
      room={room}
      intro="Practical tools rooted in modern neuroscience and timeless faith — designed to help you shed old patterns and embrace forward motion."
    />
  );
}
