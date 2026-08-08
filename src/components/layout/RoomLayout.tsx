"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import VideoBackground from "@/components/ui/VideoBackground";
import { Room } from "@/lib/navigation";

interface RoomLayoutProps {
  room: Room;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function RoomLayout({ room, title, subtitle, children }: RoomLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen animate-room-enter">
      {/* Room entrance header */}
      <VideoBackground
        src={room.video}
        overlay="medium"
        className="min-h-[280px] md:min-h-[320px] flex items-end"
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-8 pt-24">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-champagne text-body-sm mb-4 transition-colors"
          >
            <span aria-hidden>←</span> Return to Dashboard
          </Link>
          <p className="text-champagne font-serif text-body-lg tracking-wide mb-1">
            {room.label}
          </p>
          <h1 className="font-serif text-display-md text-white font-semibold mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/85 text-body-lg max-w-2xl">{subtitle}</p>
          )}
        </div>
      </VideoBackground>

      {/* Sub-navigation within room */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-sage/20 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {room.options.map((option) => {
              const isActive = pathname === option.href;
              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className={clsx(
                    "whitespace-nowrap px-4 py-2 rounded-full text-body-sm font-medium transition-all",
                    isActive
                      ? "bg-sage text-white shadow-sm"
                      : "text-forest/70 hover:bg-cream hover:text-forest"
                  )}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Room content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {children}
      </div>
    </div>
  );
}
