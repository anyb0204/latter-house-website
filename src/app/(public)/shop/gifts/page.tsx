import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const gifts = [
  { amount: "$25", description: "Perfect for a friend discovering the journey" },
  { amount: "$50", description: "Covers a book and study guide" },
  { amount: "$100", description: "Complete renewal bundle for a loved one" },
];

export default function ShopGiftsPage() {
  const room = getRoomById("shop")!;
  return (
    <RoomSubPage room={room} title="Gift Cards" subtitle="Bless someone today">
      <p className="text-body-base text-forest/65 mb-8">
        Give the gift of forward motion. Gift cards can be used for any item in the shop.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        {gifts.map((g) => (
          <Card key={g.amount} className="text-center hover:border-champagne/50 transition-colors">
            <p className="font-serif text-display-md text-champagne font-semibold mb-2">{g.amount}</p>
            <p className="text-body-sm text-forest/60 mb-4">{g.description}</p>
            <button className="w-full py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-colors">
              Purchase
            </button>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
