import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const prayers = [
  { title: "Morning Surrender", text: "Lord, I release this day into Your hands. Renew my mind and align my thoughts with Your purpose for my life." },
  { title: "Releasing the Old", text: "Father, help me identify one old pattern today that no longer serves You. Give me courage to let it go and grace to embrace the new." },
  { title: "Forward Motion", text: "Holy Spirit, guide my steps today. Show me one small action I can take toward building Your house in my life and community." },
  { title: "Evening Gratitude", text: "Thank You, Lord, for the progress I made today — however small. Rest my mind and prepare my heart for tomorrow's journey." },
];

export default function PrayerPage() {
  const room = getRoomById("devotionals")!;
  return (
    <RoomSubPage room={room} title="Guided Prayer" subtitle="Peaceful prayer prompts for every moment">
      <ContentSection>
        <p>Read each prayer slowly. Pause between sentences. Let the words settle in your heart before moving to the next.</p>
      </ContentSection>
      <div className="space-y-4 mt-8">
        {prayers.map((prayer) => (
          <Card key={prayer.title} className="border-l-4 border-l-champagne">
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">{prayer.title}</h3>
            <p className="text-body-base text-forest/75 italic leading-relaxed">{prayer.text}</p>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
