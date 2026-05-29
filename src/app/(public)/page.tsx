import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest to-sage text-white py-20 px-4 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          The Latter House<br />
          <span className="text-gold">Shall Be Greater</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10">
          Latter House Life is a community for believers who are pressing forward —
          sharing testimonies, seizing opportunities, and growing together in faith.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/join"
            className="bg-gold text-forest px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
          >
            Join for Free
          </Link>
          <Link
            href="/about"
            className="border border-white/60 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold mb-4">
            Built for Believers Who Are Moving Forward
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Whether you&apos;re looking for ministry opportunities, want to share what God has done,
            or simply need a community that understands the journey — this is your home.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🙏",
                title: "Share Praise Reports",
                description: "Testify to what God has done in your life and encourage the community.",
              },
              {
                icon: "✨",
                title: "Discover Opportunities",
                description: "Find jobs, volunteer roles, and mission opportunities aligned with your calling.",
              },
              {
                icon: "💡",
                title: "Stay Inspired",
                description: "Daily prompts and ideas to keep you moving forward in purpose and faith.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-mint/30">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-serif text-xl text-forest font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold mb-4">
            Why Latter House Life?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Community is essential to growth. We believe the church should be a place of
            real connection — where testimonies are shared, gifts are discovered, and every
            member moves forward together. Latter House Life exists to make that possible
            beyond Sunday morning.
          </p>
          <blockquote className="border-l-4 border-gold pl-6 text-left italic text-gray-700 text-lg bg-cream rounded-r-lg py-4 pr-4">
            &ldquo;The glory of this latter house shall be greater than of the former, saith the LORD of hosts.&rdquo;
            <footer className="mt-2 text-sm font-medium text-forest not-italic">— Haggai 2:9</footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-sage text-white text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
          Membership is completely free. Create your account and start connecting with a community
          that&apos;s moving forward.
        </p>
        <Link
          href="/join"
          className="bg-gold text-forest px-10 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors inline-block"
        >
          Join for Free
        </Link>
      </section>
    </>
  );
}
