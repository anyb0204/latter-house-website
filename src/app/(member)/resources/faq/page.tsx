import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const faqs = [
  { q: "What is Latter House Life?", a: "A peaceful online community for mature believers who want to shed old thinking patterns and step into God's individual purpose — using modern neuroscience techniques and timeless faith." },
  { q: "Is membership really free?", a: "Yes! Creating an account and accessing devotionals, community features, resources, and message boards is completely free. Some shop items and premium courses may have a cost." },
  { q: "Do I need to read The Latter House book first?", a: "While the book provides wonderful context, you can absolutely begin your journey here. Many members discover the book through the community." },
  { q: "What are neuroscience tools?", a: "Practical exercises based on how the brain forms habits and patterns, combined with biblical truth. They help you consciously build new ways of thinking that align with God's purpose." },
  { q: "How do I connect with other members?", a: "Visit the Community room to find prayer circles, member stories, events, and the Connect & Chat feature. Message boards are also a great place to start conversations." },
  { q: "Can I contribute content?", a: "Absolutely! Members can submit articles, share praise reports, post on message boards, and suggest books and videos for the community." },
];

export default function FAQPage() {
  const room = getRoomById("resources")!;
  return (
    <RoomSubPage room={room} title="FAQ & Help" subtitle="Answers to common questions">
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.q}>
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">{faq.q}</h3>
            <p className="text-body-base text-forest/70">{faq.a}</p>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
