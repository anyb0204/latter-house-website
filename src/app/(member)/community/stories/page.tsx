import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const stories = [
  { name: "Margaret T.", age: "67", story: "After reading The Latter House, I finally understood why I kept repeating the same patterns. The neuroscience exercises helped me see my thinking differently — and my relationship with my adult children has completely transformed." },
  { name: "Robert & Linda K.", age: "58 & 61", story: "We joined Latter House Life as empty nesters feeling lost. The community gave us purpose again. We now lead a volunteer team building homes for families in need." },
  { name: "James W.", age: "72", story: "I thought my best years were behind me. This community showed me God had a latter house planned — greater than anything before. I started writing again at 70 and published my first devotional last month." },
];

export default function StoriesPage() {
  const room = getRoomById("community")!;
  return (
    <RoomSubPage room={room} title="Member Stories" subtitle="Inspiring journeys of faith and transformation">
      <div className="space-y-6">
        {stories.map((s) => (
          <Card key={s.name} className="border-l-4 border-l-sage">
            <p className="text-body-base text-forest/80 italic leading-relaxed mb-4">&ldquo;{s.story}&rdquo;</p>
            <p className="font-medium text-forest">{s.name}</p>
            <p className="text-body-sm text-forest/50">Age {s.age}</p>
          </Card>
        ))}
      </div>
      <ContentSection>
        <p className="mt-8">Have a story to share? Visit <a href="/praise-reports" className="text-sage hover:text-forest underline">Praise Reports</a> or submit an article to inspire others on the journey.</p>
      </ContentSection>
    </RoomSubPage>
  );
}
