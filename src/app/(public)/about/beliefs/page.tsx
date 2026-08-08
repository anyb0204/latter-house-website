import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const beliefs = [
  "Every believer has a unique, God-given purpose that doesn't expire with age.",
  "The mind can be renewed through the combination of scripture and intentional practice.",
  "Community is essential — we grow faster and further together.",
  "The latter season of life can be the most purposeful and impactful.",
  "Neuroscience and faith are partners, not opponents, in transformation.",
  "Small, daily forward motion compounds into extraordinary life change.",
  "Testimony has power — sharing what God has done encourages others to believe.",
];

export default function BeliefsPage() {
  const room = getRoomById("about")!;
  return (
    <RoomSubPage room={room} title="What We Believe" subtitle="Foundations of faith">
      <ContentSection>
        <ul>
          {beliefs.map((belief) => (
            <li key={belief}>{belief}</li>
          ))}
        </ul>
      </ContentSection>
    </RoomSubPage>
  );
}
