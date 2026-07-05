import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const prayers = [
  { request: "Healing for my husband after surgery", author: "Susan M.", prayers: 24 },
  { request: "Guidance for a career transition at 55", author: "David R.", prayers: 18 },
  { request: "Reconciliation with estranged family member", author: "Anonymous", prayers: 31 },
  { request: "Strength during caregiving for aging parent", author: "Patricia L.", prayers: 15 },
];

export default function PrayerCirclePage() {
  const room = getRoomById("community")!;
  return (
    <RoomSubPage room={room} title="Prayer Circle" subtitle="Lift one another up in faith">
      <p className="text-body-base text-forest/65 mb-8">
        Join your brothers and sisters in prayer. Click &ldquo;I&apos;m Praying&rdquo; to let someone know they&apos;re not alone.
      </p>
      <div className="space-y-4">
        {prayers.map((p) => (
          <Card key={p.request}>
            <p className="text-body-base text-forest mb-2">{p.request}</p>
            <div className="flex items-center justify-between">
              <p className="text-body-sm text-forest/50">— {p.author}</p>
              <div className="flex items-center gap-3">
                <span className="text-body-sm text-sage">{p.prayers} praying</span>
                <button className="px-4 py-1.5 rounded-full bg-sage/10 text-sage text-body-sm font-medium hover:bg-sage hover:text-white transition-colors">
                  I&apos;m Praying
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
