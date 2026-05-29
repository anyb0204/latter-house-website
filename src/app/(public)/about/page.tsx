import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl sm:text-5xl text-forest font-bold mb-6">
        About Latter House Life
      </h1>

      <section className="mb-10">
        <h2 className="font-serif text-2xl text-forest font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Latter House Life exists to build a thriving digital community for believers who
          are committed to moving forward. We provide a space where testimonies are celebrated,
          opportunities are discovered, and every member is empowered to walk in their purpose.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-2xl text-forest font-semibold mb-3">Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We envision a community where the latter house is truly greater — where believers
          at every stage of their journey find connection, accountability, and forward motion.
          Whether you&apos;re a seasoned minister or just beginning to explore your calling, there
          is a place for you here.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-2xl text-forest font-semibold mb-3">What We Believe</h2>
        <ul className="space-y-3 text-gray-700 text-lg">
          {[
            "Community is vital to personal growth and spiritual development.",
            "Every testimony has the power to encourage and inspire others.",
            "Purpose is discovered in community, not in isolation.",
            "The church should extend beyond Sunday — into every day of the week.",
            "Forward motion, however small, is always better than standing still.",
          ].map((belief) => (
            <li key={belief} className="flex gap-3">
              <span className="text-gold mt-1">✦</span>
              <span>{belief}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-cream rounded-xl p-6 border border-mint/30 text-center">
        <p className="font-serif text-xl text-forest font-semibold mb-3">
          Ready to be part of the community?
        </p>
        <Link
          href="/join"
          className="bg-sage text-white px-8 py-3 rounded-lg font-medium hover:bg-forest transition-colors inline-block"
        >
          Join for Free
        </Link>
      </div>
    </div>
  );
}
