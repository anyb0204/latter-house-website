export interface NavOption {
  label: string;
  href: string;
  description: string;
}

export interface Room {
  id: string;
  label: string;
  icon: string;
  href: string;
  tagline: string;
  video: string;
  options: NavOption[];
}

export const rooms: Room[] = [
  {
    id: "devotionals",
    label: "Devotionals",
    icon: "✦",
    href: "/devotionals",
    tagline: "Begin each day in the Word",
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "Today's Devotional", href: "/devotionals/today", description: "Fresh inspiration for this morning" },
      { label: "Scripture Study", href: "/devotionals/scripture", description: "Guided passages and reflection" },
      { label: "Worship Playlist", href: "/devotionals/playlist", description: "Music, podcasts & sermons" },
      { label: "Guided Prayer", href: "/devotionals/prayer", description: "Peaceful prayer prompts" },
      { label: "My Journal", href: "/journal", description: "Record what God is speaking" },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: "◈",
    href: "/community",
    tagline: "Walk alongside fellow believers",
    video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "Praise Reports", href: "/praise-reports", description: "Celebrate what God has done" },
      { label: "Member Stories", href: "/community/stories", description: "Inspiring journeys of faith" },
      { label: "Events & Gatherings", href: "/community/events", description: "Upcoming community moments" },
      { label: "Prayer Circle", href: "/community/prayer", description: "Lift one another up" },
      { label: "Connect & Chat", href: "/community/connect", description: "Find friends on the journey" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: "◇",
    href: "/resources",
    tagline: "Tools for forward motion",
    video: "https://videos.pexels.com/video-files/854084/854084-hd_1920_1080_25fps.mp4",
    options: [
      { label: "Neuroscience Tools", href: "/resources/neuroscience", description: "Renew your mind with science" },
      { label: "Downloadables", href: "/resources/downloads", description: "Worksheets & guides to print" },
      { label: "Courses & Workshops", href: "/resources/courses", description: "Go deeper at your pace" },
      { label: "Daily Worksheets", href: "/resources/worksheets", description: "Practical exercises for today" },
      { label: "FAQ & Help", href: "/resources/faq", description: "Answers to common questions" },
    ],
  },
  {
    id: "boards",
    label: "Message Boards",
    icon: "◎",
    href: "/boards",
    tagline: "Conversations that build faith",
    video: "https://videos.pexels.com/video-files/6981411/6981411-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "General Discussion", href: "/boards/general", description: "Open conversations" },
      { label: "Prayer Requests", href: "/boards/prayer", description: "Share needs & intercede" },
      { label: "Study Groups", href: "/boards/study", description: "Book & Bible discussions" },
      { label: "Introductions", href: "/boards/introductions", description: "Welcome new members" },
      { label: "Testimonies", href: "/boards/testimonies", description: "Stories of transformation" },
    ],
  },
  {
    id: "shop",
    label: "Shop",
    icon: "❋",
    href: "/shop",
    tagline: "Equip your journey",
    video: "https://videos.pexels.com/video-files/3766292/3766292-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "The Latter House Book", href: "/shop/book", description: "The book that started it all" },
      { label: "Study Guides", href: "/shop/guides", description: "Companion workbooks" },
      { label: "Devotional Bundles", href: "/shop/bundles", description: "Curated collections" },
      { label: "Merchandise", href: "/shop/merch", description: "Wear your faith forward" },
      { label: "Gift Cards", href: "/shop/gifts", description: "Bless someone today" },
    ],
  },
  {
    id: "about",
    label: "About Us",
    icon: "◉",
    href: "/about",
    tagline: "Our mission & heart",
    video: "https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "Our Mission", href: "/about/mission", description: "Why we exist" },
      { label: "Our Story", href: "/about/story", description: "How Latter House began" },
      { label: "What We Believe", href: "/about/beliefs", description: "Foundations of faith" },
      { label: "Meet the Team", href: "/about/team", description: "The people behind this" },
      { label: "Contact Us", href: "/about/contact", description: "We'd love to hear from you" },
    ],
  },
  {
    id: "author",
    label: "About the Author",
    icon: "✧",
    href: "/author",
    tagline: "The heart behind the book",
    video: "https://videos.pexels.com/video-files/4820132/4820132-uhd_2560_1440_25fps.mp4",
    options: [
      { label: "Biography", href: "/author/bio", description: "Life, faith & calling" },
      { label: "Books & Writing", href: "/author/books", description: "Published works" },
      { label: "Speaking Events", href: "/author/speaking", description: "Invite the author" },
      { label: "Blog & Articles", href: "/author/blog", description: "Latest thoughts & teachings" },
      { label: "Media & Press", href: "/author/media", description: "Interviews & features" },
    ],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

export function getRoomByPath(pathname: string): Room | undefined {
  return rooms.find((r) => pathname.startsWith(r.href));
}
