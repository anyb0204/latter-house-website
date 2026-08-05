import Link from "next/link";
import VideoBackground from "@/components/ui/VideoBackground";
import { rooms } from "@/lib/navigation";

const heroVideos = [
  "/videos/hero-worship.mp4",
  "/videos/hero-community.mov",
  "/videos/hero-worship.mp4",
];

export default function LandingPage() {
  return (
    <>
      {/* Hero with video background */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <VideoBackground
          src={heroVideos[0]}
          overlay="dark"
          className="absolute inset-0"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto animate-fade-up">
          <p className="text-champagne font-serif text-body-lg tracking-[0.2em] uppercase mb-6">
            Welcome to Latter House Life
          </p>
          <h1 className="font-serif text-display-lg sm:text-display-xl text-white font-semibold mb-6 leading-tight">
            Shed the Old.<br />
            <span className="text-champagne-light">Step Into Your Purpose.</span>
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            For believers ready to release outdated thinking and embrace God&apos;s individual
            calling — using modern neuroscience and timeless faith to build His house, one day at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary">
              Begin Your Journey — Free
            </Link>
            <Link href="/about" className="btn-secondary bg-white/10 border-white/40 text-white hover:bg-white/20">
              Discover Our Mission
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-gentle-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <div className="w-1 h-2 bg-champagne rounded-full" />
          </div>
        </div>
      </section>

      {/* Scripture anchor */}
      <section className="section-padding bg-gradient-peaceful text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-serif text-heading-lg sm:text-display-md text-forest italic leading-relaxed mb-4">
            &ldquo;The glory of this latter house shall be greater than of the former,
            saith the LORD of hosts.&rdquo;
          </p>
          <footer className="text-body-base text-sage font-medium">— Haggai 2:9</footer>
        </blockquote>
      </section>

      {/* What you'll find here */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-display-md text-forest font-semibold mb-4">
              Your Daily Sanctuary
            </h2>
            <p className="text-body-lg text-forest/65 max-w-2xl mx-auto">
              Every visit equips you with tools, encouragement, and community —
              so you leave refreshed, renewed, and ready for forward motion.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "✦",
                title: "Daily Devotionals",
                description: "Scripture, guided prayer, and curated worship playlists to start your morning in peace.",
              },
              {
                icon: "◈",
                title: "Vibrant Community",
                description: "Connect with fellow believers, share praise reports, and walk together in faith.",
              },
              {
                icon: "◇",
                title: "Neuroscience Tools",
                description: "Practical exercises rooted in modern brain science to renew your mind and break old patterns.",
              },
              {
                icon: "◎",
                title: "Message Boards",
                description: "Meaningful conversations, prayer requests, and study groups at your fingertips.",
              },
              {
                icon: "✧",
                title: "Author Insights",
                description: "Fresh blogs, teachings, and resources from the author of The Latter House.",
              },
              {
                icon: "❋",
                title: "Opportunities",
                description: "Discover jobs, volunteer roles, and ways to serve that align with your calling.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-8 hover:shadow-xl hover:border-champagne/50 transition-all duration-300 group"
              >
                <span className="text-3xl text-champagne block mb-4 group-hover:scale-110 transition-transform" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm text-forest/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video feature section */}
      <section className="relative min-h-[500px] flex items-center">
        <VideoBackground
          src={heroVideos[1]}
          overlay="medium"
          className="absolute inset-0"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-display-md text-white font-semibold mb-6">
              Renew Your Mind.<br />
              <span className="text-champagne-light">Rebuild Your Life.</span>
            </h2>
            <p className="text-body-lg text-white/85 mb-6 leading-relaxed">
              The Latter House invites you to release patterns that no longer serve God&apos;s
              purpose for your life. Through faith-filled neuroscience techniques, you&apos;ll
              discover practical ways to think differently — and live differently.
            </p>
            <Link href="/author" className="btn-primary">
              Meet the Author
            </Link>
          </div>
          <div className="glass-card p-8 bg-white/90">
            <h3 className="font-serif text-heading-md text-forest font-semibold mb-4">
              What Members Experience
            </h3>
            <ul className="space-y-4">
              {[
                "Wake up to a fresh devotional and worship playlist",
                "Connect with friends who understand the journey",
                "Access worksheets and neuroscience exercises",
                "Find volunteer and career opportunities",
                "End each day feeling equipped and inspired",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-body-base text-forest/75">
                  <span className="text-champagne flex-shrink-0" aria-hidden>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Explore the rooms */}
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-display-md text-forest font-semibold mb-4">
              Seven Rooms. One Purpose.
            </h2>
            <p className="text-body-lg text-forest/65 max-w-2xl mx-auto">
              Each area of Latter House Life is designed like a peaceful room —
              a space to explore, grow, and find exactly what you need today.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={room.href}
                className="group bg-white rounded-2xl p-6 border border-sage/15 hover:border-champagne hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-2xl text-champagne block mb-3" aria-hidden>{room.icon}</span>
                <h3 className="font-serif text-heading-sm text-forest font-semibold mb-1">
                  {room.label}
                </h3>
                <p className="text-body-sm text-forest/55">{room.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community video section */}
      <section className="relative min-h-[400px] flex items-center justify-center">
        <VideoBackground
          src={heroVideos[2]}
          overlay="dark"
          className="absolute inset-0"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h2 className="font-serif text-display-md text-white font-semibold mb-4">
            You Were Never Meant to Walk Alone
          </h2>
          <p className="text-body-lg text-white/85 mb-8">
            Join a community of mature believers who are laughing, learning, building,
            and moving forward together — every single day.
          </p>
          <Link href="/join" className="btn-primary text-body-lg px-12">
            Join Our Community — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-sage text-center text-white">
        <h2 className="font-serif text-display-md font-semibold mb-4">
          Ready for Forward Motion?
        </h2>
        <p className="text-body-lg text-white/85 max-w-xl mx-auto mb-8">
          Create your free account today and step into the latter house —
          greater than anything that came before.
        </p>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 px-12 py-4 rounded-full bg-champagne text-forest font-semibold text-body-lg hover:bg-champagne-light transition-colors shadow-lg"
        >
          Enter Latter House Life
        </Link>
      </section>
    </>
  );
}
