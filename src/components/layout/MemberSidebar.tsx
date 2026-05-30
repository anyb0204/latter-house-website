"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/announcements", label: "Announcements" },
  { href: "/praise-reports", label: "Praise Reports" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/brainstorm", label: "Brainstorm" },
  { href: "/journal", label: "My Journal" },
];

const submitItems = [
  { href: "/submit/article", label: "Submit Article" },
  { href: "/submit/video", label: "Submit Video" },
  { href: "/submit/book", label: "Suggest Book" },
];

export default function MemberSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <div className="mb-6">
        <Link href="/" className="text-forest font-light tracking-widest uppercase text-sm">
          Latter House Life
        </Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 text-sm transition-colors tracking-wide",
              pathname === item.href
                ? "bg-forest text-white"
                : "text-gray-800 hover:bg-sage/20 hover:text-forest"
            )}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="pt-4">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Submit
          </p>
          {submitItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 text-sm transition-colors tracking-wide",
                pathname === item.href
                  ? "bg-forest text-white"
                  : "text-gray-800 hover:bg-sage/20 hover:text-forest"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-200 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm text-gray-700 font-medium">Account</span>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between bg-forest px-4 h-14 fixed top-0 left-0 right-0 z-40">
        <Link href="/dashboard" className="text-white text-sm font-light tracking-widest uppercase">
          Latter House Life
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-white hover:text-gold"
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

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={clsx(
          "md:hidden fixed top-14 left-0 bottom-0 w-64 bg-white z-40 flex flex-col p-4 transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavLinks />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-56 bg-white border-r border-gray-200 min-h-screen p-4 fixed top-0 left-0 bottom-0">
        <NavLinks />
      </aside>
    </>
  );
}
