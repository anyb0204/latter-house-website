import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function AboutPage() {
  const room = getRoomById("about")!;
  return (
    <RoomHubPage
      room={room}
      intro="Discover the heart behind Latter House Life — a sanctuary for believers ready to embrace God's greater purpose."
    />
  );
}
