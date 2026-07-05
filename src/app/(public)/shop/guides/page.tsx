import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ShopProduct } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const guides = [
  { name: "21-Day Mind Renewal Workbook", price: "$12.99", description: "Companion exercises for each chapter" },
  { name: "Group Study Leader's Guide", price: "$9.99", description: "Facilitate meaningful group discussions" },
  { name: "Personal Reflection Journal", price: "$14.99", description: "Beautiful guided journal with prompts" },
];

export default function ShopGuidesPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomSubPage room={room} title="Study Guides" subtitle="Companion workbooks for deeper growth">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <ShopProduct key={g.name} {...g} />
        ))}
      </div>
    </RoomSubPage>
  );
}
