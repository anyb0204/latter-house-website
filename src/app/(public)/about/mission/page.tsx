import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

export default function MissionPage() {
  const room = getRoomById("about")!;
  return (
    <RoomSubPage room={room} title="Our Mission" subtitle="Why we exist">
      <ContentSection>
        <p>Latter House Life exists to equip mature believers with the tools, community, and daily 
        encouragement they need to shed old patterns of thinking and step fully into God&apos;s 
        individual purpose for their lives.</p>
        <p>We believe that the latter season of life can be the greatest — not despite age and 
        experience, but because of them. By combining timeless biblical truth with modern 
        neuroscience techniques, we help members renew their minds and build forward motion, 
        one day at a time.</p>
        <h2>Our Promise to You</h2>
        <p>Every time you visit Latter House Life, you&apos;ll leave with practical tools, fresh 
        encouragement, and the sense that you&apos;re not walking this journey alone. We&apos;re here 
        to help you build God&apos;s house — in your heart, your home, and your community.</p>
      </ContentSection>
    </RoomSubPage>
  );
}
