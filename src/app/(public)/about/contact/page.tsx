import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

export default function ContactPage() {
  const room = getRoomById("about")!;
  return (
    <RoomSubPage room={room} title="Contact Us" subtitle="We'd love to hear from you">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h3 className="font-serif text-heading-sm text-forest font-semibold mb-4">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-forest mb-1">Name</label>
              <input type="text" className="w-full rounded-xl border border-sage/30 px-4 py-3 text-body-base bg-cream/50 focus:outline-none focus:ring-2 focus:ring-sage/50" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-forest mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-sage/30 px-4 py-3 text-body-base bg-cream/50 focus:outline-none focus:ring-2 focus:ring-sage/50" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-forest mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-xl border border-sage/30 px-4 py-3 text-body-base bg-cream/50 focus:outline-none focus:ring-2 focus:ring-sage/50" placeholder="How can we help?" />
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </Card>
        <div className="space-y-6">
          <Card>
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">General Inquiries</h3>
            <p className="text-body-base text-forest/70">hello@latterhouselife.com</p>
          </Card>
          <Card>
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">Speaking Requests</h3>
            <p className="text-body-base text-forest/70">speaking@latterhouselife.com</p>
          </Card>
          <Card>
            <h3 className="font-serif text-heading-sm text-forest font-semibold mb-2">Community Support</h3>
            <p className="text-body-base text-forest/70">community@latterhouselife.com</p>
          </Card>
        </div>
      </div>
    </RoomSubPage>
  );
}
