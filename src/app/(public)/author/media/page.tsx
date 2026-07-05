import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const media = [
  { title: "Faith & Science Podcast Interview", outlet: "The Renewed Mind Podcast", date: "February 2026" },
  { title: "Featured Author Spotlight", outlet: "Christian Living Magazine", date: "January 2026" },
  { title: "Conference Keynote Recording", outlet: "Forward Faith Summit", date: "November 2025" },
  { title: "Book Review: 'A Game-Changer for Mature Believers'", outlet: "The Gospel Herald", date: "October 2025" },
];

export default function AuthorMediaPage() {
  const room = getRoomById("author")!;
  return (
    <RoomSubPage room={room} title="Media & Press" subtitle="Interviews & features">
      <div className="space-y-4">
        {media.map((m) => (
          <Card key={m.title} className="hover:border-champagne/50 transition-colors cursor-pointer">
            <h3 className="font-medium text-forest text-body-base">{m.title}</h3>
            <p className="text-body-sm text-sage mt-1">{m.outlet}</p>
            <p className="text-body-sm text-forest/45 mt-1">{m.date}</p>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
