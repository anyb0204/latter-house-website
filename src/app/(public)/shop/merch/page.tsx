import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ShopProduct } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const merch = [
  { name: "Latter House Tote Bag", price: "$22.00", description: "Canvas tote with gold emblem" },
  { name: "Forward Motion Mug", price: "$16.00", description: "Ceramic mug with daily inspiration" },
  { name: "Faith & Science Tee", price: "$28.00", description: "Soft cotton, sage green" },
  { name: "Haggai 2:9 Wall Art", price: "$34.00", description: "Framed scripture print" },
];

export default function ShopMerchPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomSubPage room={room} title="Merchandise" subtitle="Wear your faith forward">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {merch.map((m) => (
          <ShopProduct key={m.name} {...m} />
        ))}
      </div>
    </RoomSubPage>
  );
}
