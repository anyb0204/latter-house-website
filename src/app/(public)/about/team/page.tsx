import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const team = [
  { name: "Founder & Author", role: "Vision & Teaching", bio: "The heart behind The Latter House and Latter House Life." },
  { name: "Community Director", role: "Member Experience", bio: "Ensuring every member feels welcomed, connected, and supported." },
  { name: "Content Curator", role: "Devotionals & Resources", bio: "Crafting daily content that renews minds and inspires forward motion." },
  { name: "Prayer Coordinator", role: "Prayer Ministry", bio: "Overseeing prayer circles and intercession across the community." },
];

export default function TeamPage() {
  const room = getRoomById("about")!;
  return (
    <RoomSubPage room={room} title="Meet the Team" subtitle="The people behind this">
      <div className="grid sm:grid-cols-2 gap-5">
        {team.map((member) => (
          <Card key={member.name} className="text-center">
            <div className="w-20 h-20 rounded-full bg-champagne/30 mx-auto mb-4 flex items-center justify-center">
              <span className="font-serif text-heading-md text-forest">{member.name.charAt(0)}</span>
            </div>
            <h3 className="font-serif text-heading-sm text-forest font-semibold">{member.name}</h3>
            <p className="text-body-sm text-champagne font-medium mt-1">{member.role}</p>
            <p className="text-body-sm text-forest/60 mt-2">{member.bio}</p>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
