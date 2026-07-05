import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { ContentSection } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

export default function StoryPage() {
  const room = getRoomById("about")!;
  return (
    <RoomSubPage room={room} title="Our Story" subtitle="How Latter House began">
      <ContentSection>
        <p>It started with a book — <em>The Latter House</em> — and a simple observation: 
        thousands of mature believers were feeling stuck. They loved God, served faithfully, 
        but sensed there was something more. An old way of thinking was holding them back 
        from the purpose God had designed specifically for them.</p>
        <p>Readers began writing letters. They shared stories of breakthrough — of finally 
        understanding why they repeated the same patterns, of discovering new purpose in 
        retirement, of rebuilding relationships they thought were lost forever.</p>
        <p>Latter House Life was born from these stories. We created a digital sanctuary where 
        believers could return every day — for devotionals, community, resources, and the 
        quiet confidence that forward motion is always possible.</p>
        <h2>The Name</h2>
        <p>From Haggai 2:9 — &ldquo;The glory of this latter house shall be greater than of the former.&rdquo; 
        We believe this promise is not just about a temple. It&apos;s about your life.</p>
      </ContentSection>
    </RoomSubPage>
  );
}
