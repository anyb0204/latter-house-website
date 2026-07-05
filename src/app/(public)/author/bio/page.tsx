import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

export default function AuthorBioPage() {
  const room = getRoomById("author")!;
  return (
    <RoomSubPage room={room} title="Biography" subtitle="Life, faith & calling">
      <ContentSection>
        <p>The author of <em>The Latter House</em> brings together decades of ministry experience, 
        a passion for neuroscience, and an unwavering belief that God&apos;s greatest work in our lives 
        often comes in our latter seasons.</p>
        <p>After years of counseling believers who felt stuck in old patterns, the author discovered 
        that combining biblical truth with practical neuroscience techniques created breakthrough 
        moments — real, lasting change in how people think, pray, and live.</p>
        <h2>A Message for Every Season</h2>
        <p>&ldquo;I wrote The Latter House for everyone who has ever wondered if their best days are 
        behind them. They&apos;re not. God is building something greater — and it starts with 
        renewing your mind.&rdquo;</p>
        <h2>Background</h2>
        <p>With advanced training in both theology and cognitive science, the author has spoken 
        at conferences, led retreats, and counseled hundreds of individuals seeking forward motion 
        in their faith journey. Latter House Life was born from a desire to make these tools 
        accessible to everyone, every day.</p>
      </ContentSection>
    </RoomSubPage>
  );
}
