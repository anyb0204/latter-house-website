import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const members = [
  { name: "Helen R.", location: "Portland, OR", interest: "Volunteer work & gardening" },
  { name: "Michael & Grace T.", location: "Nashville, TN", interest: "Music ministry & mentoring" },
  { name: "Dorothy S.", location: "Phoenix, AZ", interest: "Writing & prayer groups" },
  { name: "Frank & Marie B.", location: "Charlotte, NC", interest: "Community building & outreach" },
];

export default function ConnectPage() {
  const room = getRoomById("community")!;
  return (
    <RoomSubPage room={room} title="Connect & Chat" subtitle="Find friends on the journey">
      <p className="text-body-base text-forest/65 mb-8">
        Browse members who share your interests. Send a friendly hello and start a conversation.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {members.map((m) => (
          <Card key={m.name} className="text-center">
            <div className="w-16 h-16 rounded-full bg-champagne/30 mx-auto mb-3 flex items-center justify-center">
              <span className="font-serif text-heading-sm text-forest">{m.name.charAt(0)}</span>
            </div>
            <h3 className="font-medium text-forest text-body-base">{m.name}</h3>
            <p className="text-body-sm text-forest/50">{m.location}</p>
            <p className="text-body-sm text-sage mt-2">{m.interest}</p>
            <button className="mt-4 px-6 py-2 rounded-full bg-sage/10 text-sage text-body-sm font-medium hover:bg-sage hover:text-white transition-colors">
              Say Hello
            </button>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
