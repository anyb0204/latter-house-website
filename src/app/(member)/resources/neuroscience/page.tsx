import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const tools = [
  { title: "The Pattern Interrupt", description: "A 5-minute exercise to catch and redirect negative thought loops before they take hold." },
  { title: "Neural Pathway Mapping", description: "Identify your most common thought patterns and consciously build new, faith-filled alternatives." },
  { title: "The 21-Day Mind Renewal", description: "A structured program combining scripture meditation with neuroscience-based habit formation." },
  { title: "Emotional Regulation Breathwork", description: "Gentle breathing techniques paired with prayer to calm the nervous system and invite the Holy Spirit." },
  { title: "Purpose Clarity Exercise", description: "Guided reflection to discover God's unique calling for this season of your life." },
];

export default function NeurosciencePage() {
  const room = getRoomById("resources")!;
  return (
    <RoomSubPage room={room} title="Neuroscience Tools" subtitle="Renew your mind with science and faith">
      <ContentSection>
        <p>God designed your brain with incredible capacity for change. These tools combine 
        cutting-edge neuroscience with biblical truth to help you build new patterns of thinking 
        that align with His purpose.</p>
      </ContentSection>
      <div className="space-y-4 mt-8">
        {tools.map((tool) => (
          <Card key={tool.title} className="hover:border-champagne/50 transition-colors cursor-pointer">
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-1">{tool.title}</h3>
            <p className="text-body-sm text-forest/65">{tool.description}</p>
            <span className="inline-block mt-3 text-sage text-body-sm font-medium">Start exercise →</span>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
