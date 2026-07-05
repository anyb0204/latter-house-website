import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const events = [
  { title: "Keynote: The Latter House Conference", date: "May 2026", location: "Nashville, TN" },
  { title: "Workshop: Neuroscience & Faith Retreat", date: "June 2026", location: "Asheville, NC" },
  { title: "Guest Speaker: Forward Motion Summit", date: "August 2026", location: "Dallas, TX" },
];

export default function AuthorSpeakingPage() {
  const room = getRoomById("author")!;
  return (
    <RoomSubPage room={room} title="Speaking Events" subtitle="Invite the author">
      <p className="text-body-base text-forest/65 mb-8">
        Interested in having the author speak at your church, conference, or retreat? 
        We&apos;d love to hear from you.
      </p>
      <div className="space-y-4 mb-8">
        {events.map((e) => (
          <Card key={e.title}>
            <h3 className="font-medium text-forest text-body-base">{e.title}</h3>
            <p className="text-body-sm text-sage mt-1">{e.date} · {e.location}</p>
          </Card>
        ))}
      </div>
      <Card className="bg-gradient-to-r from-champagne/10 to-sage/10 text-center">
        <p className="font-serif text-heading-sm text-forest mb-3">Book a Speaking Engagement</p>
        <p className="text-body-sm text-forest/60 mb-4">Contact us to discuss availability and topics</p>
        <a href="/about/contact" className="btn-primary !inline-flex">Get in Touch</a>
      </Card>
    </RoomSubPage>
  );
}
