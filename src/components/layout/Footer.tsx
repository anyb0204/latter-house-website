import Link from "next/link";
import { rooms } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <p className="font-serif text-heading-sm font-bold mb-3">Latter House Life</p>
            <p className="text-body-sm text-mint/80 leading-relaxed">
              A peaceful community for believers ready to shed old patterns and fulfill
              God&apos;s individual purpose — one beautiful day at a time.
            </p>
          </div>

          {rooms.slice(0, 3).map((room) => (
            <div key={room.id}>
              <p className="font-medium text-champagne text-body-sm mb-3">{room.label}</p>
              <ul className="space-y-2">
                {room.options.slice(0, 4).map((opt) => (
                  <li key={opt.href}>
                    <Link href={opt.href} className="text-body-sm text-white/70 hover:text-champagne transition-colors">
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-white/40">
            &copy; {new Date().getFullYear()} Latter House Life. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about/contact" className="text-body-sm text-white/50 hover:text-champagne transition-colors">
              Contact
            </Link>
            <Link href="/about" className="text-body-sm text-white/50 hover:text-champagne transition-colors">
              About
            </Link>
            <Link href="/join" className="text-body-sm text-champagne hover:text-champagne-light transition-colors">
              Join Free
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
