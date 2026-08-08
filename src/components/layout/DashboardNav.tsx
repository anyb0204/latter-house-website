"use client";

import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import { rooms, Room } from "@/lib/navigation";
import { UserButton } from "@clerk/nextjs";

function RoomCard({ room }: { room: Room }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={room.href}
        className={clsx(
          "group block rounded-2xl border-2 p-6 transition-all duration-300",
          "bg-white/80 backdrop-blur-sm border-sage/20",
          "hover:border-champagne hover:shadow-xl hover:shadow-champagne/10 hover:-translate-y-1",
          hovered && "border-champagne shadow-xl shadow-champagne/10 -translate-y-1"
        )}
      >
        <span className="text-3xl text-champagne block mb-3" aria-hidden>
          {room.icon}
        </span>
        <h3 className="font-serif text-heading-md text-forest font-semibold mb-1">
          {room.label}
        </h3>
        <p className="text-body-sm text-forest/60">{room.tagline}</p>
        <span className="inline-flex items-center gap-1 mt-4 text-sage text-body-sm font-medium group-hover:text-champagne transition-colors">
          Enter room <span aria-hidden>→</span>
        </span>
      </Link>

      {/* Hover dropdown */}
      <div
        className={clsx(
          "absolute left-0 right-0 top-full mt-2 z-50 transition-all duration-200 origin-top",
          hovered
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-champagne/30 overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-sage/10 to-champagne/10 border-b border-sage/10">
            <p className="text-body-sm font-medium text-forest">
              Choose your path in {room.label}
            </p>
          </div>
          <ul className="py-2">
            {room.options.map((option) => (
              <li key={option.href}>
                <Link
                  href={option.href}
                  className="flex flex-col px-4 py-3 hover:bg-cream transition-colors"
                >
                  <span className="font-medium text-forest text-body-base">
                    {option.label}
                  </span>
                  <span className="text-body-sm text-forest/55 mt-0.5">
                    {option.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-sage/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="font-serif text-heading-sm text-forest font-bold">
            Latter House Life
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/opportunities" className="text-body-sm text-forest/70 hover:text-sage transition-colors">
              Opportunities
            </Link>
            <Link href="/announcements" className="text-body-sm text-forest/70 hover:text-sage transition-colors">
              Announcements
            </Link>
            <Link href="/" className="text-body-sm text-forest/70 hover:text-sage transition-colors">
              Home
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>

          <button
            className="md:hidden p-2 text-forest/70"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-sage/20 px-4 py-4 space-y-2">
          <Link href="/opportunities" className="block py-2 text-body-base text-forest" onClick={() => setMobileOpen(false)}>
            Opportunities
          </Link>
          <Link href="/announcements" className="block py-2 text-body-base text-forest" onClick={() => setMobileOpen(false)}>
            Announcements
          </Link>
          <Link href="/" className="block py-2 text-body-base text-forest" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <div className="pt-2"><UserButton afterSignOutUrl="/" /></div>
        </div>
      )}
    </header>
  );
}

export function DashboardRoomGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
