"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-forest border-b border-forest sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white text-lg font-light tracking-widest uppercase">
            Latter House Life
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors tracking-wider uppercase">
              About
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm text-white hover:text-gold transition-colors tracking-wider uppercase">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-sm text-white/80 hover:text-white transition-colors tracking-wider uppercase">
                Sign In
              </Link>
              <Link
                href="/join"
                className="bg-gold text-forest px-5 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
              >
                Join Free
              </Link>
            </SignedOut>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white hover:text-gold"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/20 py-4 flex flex-col gap-3">
            <Link href="/about" className="text-sm text-white uppercase tracking-wider px-2">About</Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm text-gold uppercase tracking-wider px-2">Dashboard</Link>
              <div className="px-2"><UserButton afterSignOutUrl="/" /></div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-sm text-white uppercase tracking-wider px-2">Sign In</Link>
              <Link href="/join" className="text-sm bg-gold text-forest px-4 py-2 font-semibold uppercase tracking-widest hover:bg-yellow-400 text-center mx-2">
                Join Free
              </Link>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
