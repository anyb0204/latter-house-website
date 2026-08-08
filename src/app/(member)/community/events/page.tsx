import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const events = [
  { title: "Monthly Community Gathering", date: "First Saturday of each month", time: "10:00 AM EST", type: "Virtual" },
  { title: "Neuroscience & Faith Workshop", date: "March 15, 2026", time: "2:00 PM EST", type: "Virtual" },
  { title: "Spring Prayer Retreat", date: "April 22-24, 2026", time: "All day", type: "In Person — Asheville, NC" },
  { title: "Book Club: The Latter House", date: "Every Tuesday", time: "7:00 PM EST", type: "Virtual" },
];

export default function EventsPage() {
  const room = getRoomById("community")!;
  return (
    <RoomSubPage room={room} title="Events & Gatherings" subtitle="Upcoming community moments to look forward to">
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-serif text-heading-sm text-forest font-semibold">{event.title}</h3>
              <p className="text-body-sm text-sage mt-1">{event.date} · {event.time}</p>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-champagne/20 text-forest text-body-sm font-medium">
              {event.type}
            </span>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
