import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function AuthorPage() {
  const room = getRoomById("author")!;
  return (
    <RoomHubPage
      room={room}
      intro="Meet the heart and mind behind The Latter House — a voice for believers ready to embrace their latter season with purpose."
    />
  );
}
