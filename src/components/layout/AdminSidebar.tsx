"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";

const adminItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/announcements", label: "Announcements", icon: "📢" },
  { href: "/admin/praise-reports", label: "Praise Reports", icon: "🙏" },
  { href: "/admin/opportunities", label: "Opportunities", icon: "✨" },
  { href: "/admin/submissions", label: "Submissions", icon: "📝" },
  { href: "/admin/moderation", label: "Moderation Log", icon: "🛡️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <div className="mb-6">
        <Link href="/admin" className="font-serif text-lg text-forest font-bold">
          LHL Admin
        </Link>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1">
        {adminItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === item.href
                ? "bg-forest text-white"
                : "text-gray-700 hover:bg-mint/20 hover:text-forest"
            )}
            onClick={() => setOpen(false)}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-mint/30 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <div>
          <span className="text-xs text-gray-600 block">Admin</span>
          <Link href="/dashboard" className="text-xs text-sage hover:text-forest">
            Member view →
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between bg-forest text-white px-4 h-14 fixed top-0 left-0 right-0 z-40">
        <span className="font-serif text-lg font-bold">LHL Admin</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2"
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

      {open && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />
      )}

      <div
        className={clsx(
          "md:hidden fixed top-14 left-0 bottom-0 w-64 bg-white z-40 flex flex-col p-4 transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavLinks />
      </div>

      <aside className="hidden md:flex md:flex-col w-56 bg-white border-r border-mint/30 min-h-screen p-4 fixed top-0 left-0 bottom-0">
        <NavLinks />
      </aside>
    </>
  );
}
