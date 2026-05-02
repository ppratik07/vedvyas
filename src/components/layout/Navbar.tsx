"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Settings, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Explorer", href: "/", match: (p: string) => p === "/" },
  { label: "Reader", href: "/reader/bhagavad-gita/1/1", match: (p: string) => p.startsWith("/reader") },
  { label: "Search", href: "/search", match: (p: string) => p.startsWith("/search") },
  { label: "Stats", href: "/stats", match: (p: string) => p.startsWith("/stats") },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#FDF6EC]/95 backdrop-blur border-b border-[#E8D5B8] px-6 py-0 flex items-stretch justify-between h-14 shrink-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-8">
        <span className="font-display text-xl font-bold text-[#C17D3C] tracking-wide">
          Ved Vyas
        </span>
      </Link>

      {/* Nav Links — tab-style with bottom indicator */}
      <div className="hidden md:flex items-stretch gap-0">
        {NAV_LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center px-5 text-sm font-medium h-full transition-colors ${
                active
                  ? "text-[#C17D3C]"
                  : "text-[#8B6344] hover:text-[#3B2415]"
              }`}
            >
              {link.label}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C17D3C] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-[#8B6344] hover:text-[#C17D3C] rounded-lg hover:bg-[#F5E6D0] transition-colors">
          <BookMarked size={17} />
        </button>
        <button className="p-2 text-[#8B6344] hover:text-[#C17D3C] rounded-lg hover:bg-[#F5E6D0] transition-colors">
          <Settings size={17} />
        </button>
        <button className="ml-1 w-8 h-8 bg-[#C17D3C] hover:bg-[#9B6020] rounded-full flex items-center justify-center text-white transition-colors">
          <User size={15} />
        </button>
      </div>
    </nav>
  );
}
