import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { BlogPostPreview } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const posts = [
  { title: "Why Your Latter Season May Be Your Greatest", excerpt: "God doesn't retire His purposes for us. Here's why the latter house can exceed everything that came before.", author: "The Author", date: "March 28, 2026", category: "Purpose" },
  { title: "3 Neuroscience Exercises for Morning Devotion", excerpt: "Start your day with these simple practices that combine brain science and prayer for lasting renewal.", author: "The Author", date: "March 21, 2026", category: "Tools" },
  { title: "The Power of Community in Mind Renewal", excerpt: "You weren't designed to renew your mind alone. Discover why community accelerates transformation.", author: "The Author", date: "March 14, 2026", category: "Community" },
  { title: "What Haggai Teaches Us About Building Anew", excerpt: "The prophet's message about the latter house holds surprising relevance for today's believer.", author: "The Author", date: "March 7, 2026", category: "Scripture" },
];

export default function AuthorBlogPage() {
  const room = getRoomById("author")!;
  return (
    <RoomSubPage room={room} title="Blog & Articles" subtitle="Latest thoughts & teachings">
      <div className="grid sm:grid-cols-2 gap-5">
        {posts.map((post) => (
          <BlogPostPreview key={post.title} {...post} />
        ))}
      </div>
    </RoomSubPage>
  );
}
