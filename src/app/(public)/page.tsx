import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest to-sage text-white py-28 px-6 text-center">
        <p className="uppercase tracking-widest text-gold/90 text-xs font-light mb-6">
          Welcome to
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl" style={{ fontWeight: 100, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Latter House Life
        </h1>
        <div className="w-12 h-px bg-gold mx-auto my-8 opacity-60" />
        <p className="text-sm sm:text-base text-white/75 max-w-lg mx-auto mb-12 font-light leading-loose tracking-wider">
          A community for believers who are pressing forward &mdash; sharing testimonies,
          seizing opportunities, and growing together in faith.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/join"
            className="bg-gold text-forest px-10 py-3 text-xs uppercase tracking-widest font-medium hover:bg-yellow-400 transition-colors"
          >
            Join for Free
          </Link>
          <Link
            href="/about"
            className="border border-white/30 text-white/80 px-10 py-3 text-xs uppercase tracking-widest font-light hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-14 px-6 bg-cream text-center">
        <p className="text-forest/60 italic text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          &ldquo;The glory of this latter house shall be greater than of the former, saith the LORD of hosts.&rdquo;
        </p>
        <p className="mt-3 text-xs uppercase tracking-widest text-gold">Haggai 2:9</p>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-widest text-gold text-xs mb-4">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl text-forest mb-14" style={{ fontWeight: 100, letterSpacing: "-0.01em" }}>
            Built for Believers Moving Forward
          </h2>
          <div className="grid sm:grid-cols-3 gap-px bg-sage/10">
            {[
              {
                title: "Praise Reports",
                description: "Share what God has done in your life and encourage those around you.",
              },
              {
                title: "Opportunities",
                description: "Discover jobs, volunteer roles, and mission needs aligned with your calling.",
              },
              {
                title: "Forward Motion",
                description: "Practical ideas and daily prompts to keep you moving in purpose.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-10">
                <div className="w-6 h-px bg-gold mx-auto mb-6" />
                <h3 className="text-xs uppercase tracking-widest text-forest font-normal mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-xl mx-auto text-center">
          <p className="uppercase tracking-widest text-gold text-xs mb-4">Our Purpose</p>
          <h2 className="text-3xl sm:text-4xl text-forest mb-8" style={{ fontWeight: 100, letterSpacing: "-0.01em" }}>
            Beyond Sunday Morning
          </h2>
          <p className="text-gray-400 text-sm leading-loose font-light">
            Community is essential to growth. We believe the church should be a place of
            real connection &mdash; where testimonies are shared, gifts are discovered, and every
            member moves forward together. Latter House Life exists to make that possible
            every day of the week.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-forest text-white text-center">
        <p className="uppercase tracking-widest text-gold/70 text-xs mb-4">Get Started</p>
        <h2 className="text-3xl sm:text-4xl mb-6" style={{ fontWeight: 100, letterSpacing: "-0.01em" }}>
          Ready to Join?
        </h2>
        <p className="text-white/60 text-sm mb-10 max-w-sm mx-auto font-light leading-loose">
          Membership is completely free. Create your account and start connecting
          with a community that&apos;s moving forward.
        </p>
        <Link
          href="/join"
          className="bg-gold text-forest px-12 py-3 text-xs uppercase tracking-widest font-medium hover:bg-yellow-400 transition-colors inline-block"
        >
          Join for Free
        </Link>
      </section>
    </>
  );
}
