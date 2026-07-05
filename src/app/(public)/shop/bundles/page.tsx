import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ShopProduct } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const bundles = [
  { name: "Complete Renewal Bundle", price: "$39.99", description: "Book + Workbook + Journal", badge: "Best Value" },
  { name: "Morning Devotional Kit", price: "$24.99", description: "Journal + Prayer cards + Playlist access" },
  { name: "Group Study Bundle (5-pack)", price: "$79.99", description: "5 books + Leader's guide", badge: "Popular" },
];

export default function ShopBundlesPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomSubPage room={room} title="Devotional Bundles" subtitle="Curated collections for your journey">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((b) => (
          <ShopProduct key={b.name} {...b} />
        ))}
      </div>
    </RoomSubPage>
  );
}
