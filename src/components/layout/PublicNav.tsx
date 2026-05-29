"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-mint/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl text-forest font-bold">
            Latter House Life
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm text-gray-600 hover:text-forest transition-colors">
              About
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm text-sage hover:text-forest transition-colors font-medium">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-sm text-gray-600 hover:text-forest transition-colors">
                Sign In
              </Link>
              <Link
                href="/join"
                className="bg-sage text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-forest transition-colors"
              >
                Join for Free
              </Link>
            </SignedOut>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-forest"
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
          <div className="md:hidden border-t border-mint/30 py-4 flex flex-col gap-3">
            <Link href="/about" className="text-sm text-gray-600 hover:text-forest px-2">About</Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm text-sage font-medium px-2">Dashboard</Link>
              <div className="px-2"><UserButton afterSignOutUrl="/" /></div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-sm text-gray-600 hover:text-forest px-2">Sign In</Link>
              <Link href="/join" className="text-sm bg-sage text-white px-4 py-2 rounded-md font-medium hover:bg-forest text-center mx-2">
                Join for Free
              </Link>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
