import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const downloads = [
  { title: "Daily Mind Renewal Worksheet", type: "PDF", size: "2 pages" },
  { title: "21-Day Challenge Tracker", type: "PDF", size: "4 pages" },
  { title: "Prayer Journal Template", type: "PDF", size: "8 pages" },
  { title: "Neuroscience & Faith Quick Reference", type: "PDF", size: "1 page" },
  { title: "Purpose Discovery Guide", type: "PDF", size: "6 pages" },
  { title: "Community Connection Cards", type: "PDF", size: "3 pages" },
];

export default function DownloadsPage() {
  const room = getRoomById("resources")!;
  return (
    <RoomSubPage room={room} title="Downloadables" subtitle="Worksheets & guides to print and use">
      <div className="grid sm:grid-cols-2 gap-4">
        {downloads.map((d) => (
          <Card key={d.title} className="flex items-center justify-between hover:border-champagne/50 transition-colors">
            <div>
              <h3 className="font-medium text-forest text-body-base">{d.title}</h3>
              <p className="text-body-sm text-forest/50">{d.type} · {d.size}</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-champagne/20 text-forest text-body-sm font-medium hover:bg-champagne/40 transition-colors">
              Download
            </button>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
