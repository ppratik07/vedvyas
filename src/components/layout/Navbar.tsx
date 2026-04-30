"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Search, BarChart2, Settings, Bell, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Explorer", href: "/", match: (p: string) => p === "/" },
  { label: "Reader", href: "/reader/bhagavad-gita/1/1", match: (p: string) => p.startsWith("/reader") },
  { label: "Search", href: "/search", match: (p: string) => p.startsWith("/search") },
  { label: "Stats", href: "/stats", match: (p: string) => p.startsWith("/stats") },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#FDF6EC] border-b border-[#E8D5B8] px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-display text-xl font-bold text-[#C17D3C] tracking-wide">
          Ved Vyas
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                active
                  ? "text-[#C17D3C] border-b-2 border-[#C17D3C] rounded-none"
                  : "text-[#8B6344] hover:text-[#3B2415]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3">
        <button className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded-full hover:bg-[#F5E6D0]">
          <BookOpen size={18} />
        </button>
        <button className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded-full hover:bg-[#F5E6D0]">
          <Settings size={18} />
        </button>
        <button className="w-8 h-8 bg-[#C17D3C] rounded-full flex items-center justify-center text-white overflow-hidden">
          <User size={16} />
        </button>
      </div>
    </nav>
  );
}
