import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const todaysVerse = {
  reference: "Romans 12:2",
  text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
};

const todaysReflection = `Today's theme is renewal. Just as the latter house was built upon new foundations, 
God invites you to release old thought patterns that no longer serve His purpose for your life. 
Take a moment to breathe deeply and ask: "Lord, what old way of thinking am I ready to release today?"`;

export default function TodayDevotionalPage() {
  const room = getRoomById("devotionals")!;
  return (
    <RoomSubPage room={room} title="Today's Devotional" subtitle="Fresh inspiration for this morning">
      <Card className="bg-gradient-to-br from-cream to-champagne/10 border-champagne/30 mb-8">
        <p className="text-champagne text-body-sm font-medium uppercase tracking-wider mb-2">Today&apos;s Scripture</p>
        <p className="font-serif text-heading-md text-forest italic leading-relaxed mb-4">&ldquo;{todaysVerse.text}&rdquo;</p>
        <p className="text-body-base text-sage font-medium">— {todaysVerse.reference}</p>
      </Card>
      <ContentSection>
        <h2>Reflection</h2>
        <p>{todaysReflection}</p>
        <h2>Today&apos;s Practice</h2>
        <p>Write down one old thought pattern you&apos;re releasing today. Then write one new truth from God&apos;s Word to replace it. Carry this with you throughout the day.</p>
      </ContentSection>
    </RoomSubPage>
  );
}
