import Card from "@/components/ui/Card";
import Link from "next/link";

interface ContentSectionProps {
  children: React.ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return <div className="content-prose">{children}</div>;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
}

export function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  const content = (
    <Card className="h-full hover:border-champagne/50 hover:shadow-md transition-all duration-300">
      {icon && <span className="text-2xl text-champagne block mb-3" aria-hidden>{icon}</span>}
      <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">{title}</h3>
      <p className="text-body-sm text-forest/65">{description}</p>
      {href && (
        <span className="inline-flex items-center gap-1 mt-4 text-sage text-body-sm font-medium">
          Learn more <span aria-hidden>→</span>
        </span>
      )}
    </Card>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }
  return content;
}

interface ComingSoonBannerProps {
  message?: string;
}

export function ComingSoonBanner({
  message = "This feature is being lovingly prepared for you. Check back soon!",
}: ComingSoonBannerProps) {
  return (
    <div className="bg-gradient-to-r from-champagne/20 to-sage/10 rounded-xl p-6 border border-champagne/30 text-center">
      <p className="text-body-base text-forest/70">{message}</p>
    </div>
  );
}

interface PlaylistItemProps {
  title: string;
  type: "music" | "podcast" | "sermon";
  duration: string;
}

export function PlaylistItem({ title, type, duration }: PlaylistItemProps) {
  const icons = { music: "♪", podcast: "◉", sermon: "✦" };
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-sage/15 hover:border-champagne/40 transition-colors">
      <span className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center text-champagne text-xl" aria-hidden>
        {icons[type]}
      </span>
      <div className="flex-1">
        <p className="font-medium text-forest text-body-base">{title}</p>
        <p className="text-body-sm text-forest/50 capitalize">{type} · {duration}</p>
      </div>
      <button className="px-4 py-2 rounded-full bg-sage/10 text-sage text-body-sm font-medium hover:bg-sage hover:text-white transition-colors">
        Play
      </button>
    </div>
  );
}

interface BoardThreadProps {
  title: string;
  author: string;
  replies: number;
  lastActive: string;
  pinned?: boolean;
}

export function BoardThread({ title, author, replies, lastActive, pinned }: BoardThreadProps) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-sage/15 hover:border-champagne/40 transition-all hover:shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {pinned && (
            <span className="text-xs bg-champagne/30 text-forest px-2 py-0.5 rounded-full">Pinned</span>
          )}
          <h3 className="font-medium text-forest text-body-base">{title}</h3>
        </div>
        <p className="text-body-sm text-forest/50">by {author} · {lastActive}</p>
      </div>
      <div className="text-center px-4">
        <p className="font-serif text-heading-sm text-sage">{replies}</p>
        <p className="text-xs text-forest/40">replies</p>
      </div>
    </div>
  );
}

interface ShopProductProps {
  name: string;
  price: string;
  description: string;
  badge?: string;
}

export function ShopProduct({ name, price, description, badge }: ShopProductProps) {
  return (
    <Card className="text-center hover:border-champagne/50 hover:shadow-lg transition-all duration-300">
      <div className="aspect-square bg-gradient-to-br from-cream to-champagne/20 rounded-xl mb-4 flex items-center justify-center">
        <span className="text-5xl text-champagne/60" aria-hidden>❋</span>
      </div>
      {badge && (
        <span className="inline-block text-xs bg-champagne/30 text-forest px-3 py-1 rounded-full mb-2">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-heading-sm text-forest font-semibold mb-1">{name}</h3>
      <p className="text-body-sm text-forest/60 mb-3">{description}</p>
      <p className="font-serif text-heading-sm text-champagne font-semibold mb-4">{price}</p>
      <button className="w-full py-3 rounded-full bg-sage text-white font-medium hover:bg-forest transition-colors">
        Add to Cart
      </button>
    </Card>
  );
}

interface BlogPostPreviewProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
}

export function BlogPostPreview({ title, excerpt, author, date, category }: BlogPostPreviewProps) {
  return (
    <Card className="hover:border-champagne/50 transition-all">
      <span className="text-xs text-sage font-medium uppercase tracking-wider">{category}</span>
      <h3 className="font-serif text-heading-sm text-forest font-semibold mt-2 mb-2">{title}</h3>
      <p className="text-body-sm text-forest/65 mb-4 line-clamp-2">{excerpt}</p>
      <p className="text-body-sm text-forest/45">{author} · {date}</p>
    </Card>
  );
}
