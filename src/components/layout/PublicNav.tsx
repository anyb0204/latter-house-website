"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { rooms } from "@/lib/navigation";
import { clsx } from "clsx";

function NavDropdown({ room }: { room: typeof rooms[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={room.href}
        className="text-body-sm text-forest/75 hover:text-sage transition-colors py-2"
      >
        {room.label}
      </Link>
      <div
        className={clsx(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="bg-white rounded-xl shadow-xl border border-champagne/30 w-64 py-2 overflow-hidden">
          {room.options.slice(0, 5).map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="block px-4 py-2.5 hover:bg-cream transition-colors"
            >
              <span className="text-body-sm font-medium text-forest block">{option.label}</span>
              <span className="text-xs text-forest/50">{option.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-sage/15 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="font-serif text-heading-sm text-forest font-bold">
            Latter House Life
          </Link>

          {/* Desktop nav with dropdowns */}
          <div className="hidden lg:flex items-center gap-5">
            {rooms.slice(0, 5).map((room) => (
              <NavDropdown key={room.id} room={room} />
            ))}
            <Link href="/author" className="text-body-sm text-forest/75 hover:text-sage transition-colors">
              Author
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-body-sm text-sage font-medium hover:text-forest transition-colors">
                My Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-body-sm text-forest/75 hover:text-forest transition-colors">
                Sign In
              </Link>
              <Link href="/join" className="btn-primary !px-5 !py-2 !text-body-sm">
                Join Free
              </Link>
            </SignedOut>
          </div>

          <button
            className="lg:hidden p-2 text-forest/70"
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

        {mobileOpen && (
          <div className="lg:hidden border-t border-sage/15 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {rooms.map((room) => (
              <div key={room.id}>
                <Link
                  href={room.href}
                  className="block py-2 font-medium text-forest"
                  onClick={() => setMobileOpen(false)}
                >
                  {room.label}
                </Link>
                <div className="pl-4 space-y-1 pb-2">
                  {room.options.map((opt) => (
                    <Link
                      key={opt.href}
                      href={opt.href}
                      className="block py-1 text-body-sm text-forest/60"
                      onClick={() => setMobileOpen(false)}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <SignedIn>
              <Link href="/dashboard" className="block py-2 text-sage font-medium" onClick={() => setMobileOpen(false)}>
                My Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="pt-4 flex gap-3">
                <Link href="/sign-in" className="flex-1 text-center py-2 border border-sage/30 rounded-full text-forest" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/join" className="flex-1 text-center py-2 bg-sage text-white rounded-full" onClick={() => setMobileOpen(false)}>
                  Join Free
                </Link>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
