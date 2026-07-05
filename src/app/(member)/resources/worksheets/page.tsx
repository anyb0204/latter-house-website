import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const worksheets = [
  { title: "Morning Intention Setting", time: "5 min" },
  { title: "Gratitude & Growth Reflection", time: "10 min" },
  { title: "Old Pattern / New Truth", time: "15 min" },
  { title: "Evening Review & Release", time: "10 min" },
  { title: "Weekly Purpose Check-In", time: "20 min" },
];

export default function WorksheetsPage() {
  const room = getRoomById("resources")!;
  return (
    <RoomSubPage room={room} title="Daily Worksheets" subtitle="Practical exercises for today">
      <p className="text-body-base text-forest/65 mb-8">
        Choose a worksheet based on how much time you have. Each one is designed to create real forward motion.
      </p>
      <div className="space-y-3">
        {worksheets.map((w) => (
          <Card key={w.title} className="flex items-center justify-between hover:border-champagne/50 transition-colors cursor-pointer">
            <h3 className="font-medium text-forest text-body-base">{w.title}</h3>
            <span className="text-body-sm text-sage">{w.time}</span>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
