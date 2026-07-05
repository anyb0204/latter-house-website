import RoomHubPage from "@/components/layout/RoomHubPage";
import { getRoomById } from "@/lib/navigation";

export default function ShopPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomHubPage
      room={room}
      intro="Equip your journey with books, study guides, devotional bundles, and meaningful gifts."
    />
  );
}
