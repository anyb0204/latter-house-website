import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest to-sage text-white py-28 px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-gold/90 text-sm font-light mb-6">
          Welcome to
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-[0.15em] uppercase mb-4 leading-tight">
          Latter House Life
        </h1>
        <div className="w-16 h-px bg-gold mx-auto my-8 opacity-70" />
        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
          A community for believers who are pressing forward — sharing testimonies,
          seizing opportunities, and growing together in faith.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/join"
            className="bg-gold text-forest px-10 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-yellow-400 transition-colors"
          >
            Join for Free
          </Link>
          <Link
            href="/about"
            className="border border-white/40 text-white/90 px-10 py-3 text-sm uppercase tracking-[0.2em] font-light hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-14 px-6 bg-cream text-center">
        <p className="text-forest/70 italic text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
          &ldquo;The glory of this latter house shall be greater than of the former, saith the LORD of hosts.&rdquo;
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Haggai 2:9</p>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">What We Offer</p>
          <h2 className="text-2xl sm:text-3xl font-thin tracking-[0.12em] uppercase text-forest mb-12">
            Built for Believers Moving Forward
          </h2>
          <div className="grid sm:grid-cols-3 gap-px bg-sage/20">
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
                <div className="w-8 h-px bg-gold mx-auto mb-6" />
                <h3 className="text-sm uppercase tracking-[0.25em] text-forest font-normal mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Our Purpose</p>
          <h2 className="text-2xl sm:text-3xl font-thin tracking-[0.12em] uppercase text-forest mb-8">
            Beyond Sunday Morning
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            Community is essential to growth. We believe the church should be a place of
            real connection — where testimonies are shared, gifts are discovered, and every
            member moves forward together. Latter House Life exists to make that possible
            every day of the week.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-forest text-white text-center">
        <p className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-4">Get Started</p>
        <h2 className="text-2xl sm:text-3xl font-thin tracking-[0.12em] uppercase mb-6">
          Ready to Join?
        </h2>
        <p className="text-white/70 text-sm mb-10 max-w-md mx-auto font-light leading-relaxed tracking-wide">
          Membership is completely free. Create your account and start connecting
          with a community that&apos;s moving forward.
        </p>
        <Link
          href="/join"
          className="bg-gold text-forest px-12 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-yellow-400 transition-colors inline-block"
        >
          Join for Free
        </Link>
      </section>
    </>
  );
}
