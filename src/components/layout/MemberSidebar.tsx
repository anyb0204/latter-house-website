"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/announcements", label: "Announcements", icon: "📢" },
  { href: "/praise-reports", label: "Praise Reports", icon: "🙏" },
  { href: "/opportunities", label: "Opportunities", icon: "✨" },
  { href: "/brainstorm", label: "Brainstorm", icon: "💡" },
  { href: "/journal", label: "My Journal", icon: "📓" },
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
        <Link href="/" className="font-serif text-lg text-forest font-bold">
          Latter House Life
        </Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === item.href
                ? "bg-sage text-white"
                : "text-gray-700 hover:bg-mint/20 hover:text-forest"
            )}
            onClick={() => setOpen(false)}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <div className="pt-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Submit
          </p>
          {submitItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-sage text-white"
                  : "text-gray-700 hover:bg-mint/20 hover:text-forest"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-auto pt-6 border-t border-mint/30 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm text-gray-600">Account</span>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-mint/30 px-4 h-14 fixed top-0 left-0 right-0 z-40">
        <Link href="/dashboard" className="font-serif text-lg text-forest font-bold">
          Latter House Life
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-600 hover:text-forest"
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
      <aside className="hidden md:flex md:flex-col w-56 bg-white border-r border-mint/30 min-h-screen p-4 fixed top-0 left-0 bottom-0">
        <NavLinks />
      </aside>
    </>
  );
}
