import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const studies = [
  { title: "Renewing the Mind", passage: "Romans 12:1-2", duration: "15 min" },
  { title: "Building on New Foundations", passage: "Haggai 2:1-9", duration: "20 min" },
  { title: "Breaking Free from Old Patterns", passage: "2 Corinthians 5:17", duration: "15 min" },
  { title: "Walking in Your Calling", passage: "Ephesians 2:10", duration: "20 min" },
];

export default function ScriptureStudyPage() {
  const room = getRoomById("devotionals")!;
  return (
    <RoomSubPage room={room} title="Scripture Study" subtitle="Guided passages and reflection">
      <ContentSection>
        <p>Each study is designed for peaceful, unhurried reflection. Find a comfortable spot, 
        grab your journal, and let the Word speak to your heart.</p>
      </ContentSection>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {studies.map((study) => (
          <Card key={study.title} className="hover:border-champagne/50 transition-colors cursor-pointer">
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-1">{study.title}</h3>
            <p className="text-body-sm text-sage mb-2">{study.passage}</p>
            <p className="text-body-sm text-forest/50">{study.duration} guided study</p>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
