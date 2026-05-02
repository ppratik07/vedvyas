"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookMarked, Settings, User, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRef, useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Explorer", href: "/", match: (p: string) => p === "/" },
  { label: "Reader", href: "/reader/bhagavad-gita/1/1", match: (p: string) => p.startsWith("/reader") },
  { label: "Search", href: "/search", match: (p: string) => p.startsWith("/search") },
  { label: "Stats", href: "/stats", match: (p: string) => p.startsWith("/stats") },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

        {/* User avatar / dropdown */}
        {ready && (
          <div className="relative ml-1" ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 h-8 pl-1 pr-2 rounded-full bg-[#C17D3C] hover:bg-[#9B6020] text-white transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold leading-none">
                    {user.avatarInitial}
                  </span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl border border-[#E8D5B8] shadow-xl shadow-amber-900/10 overflow-hidden z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-[#F5E6D0]">
                      <p className="text-sm font-semibold text-[#3B2415] truncate">{user.name}</p>
                      <p className="text-xs text-[#8B6344] truncate mt-0.5">{user.email}</p>
                    </div>
                    {/* Menu items */}
                    <div className="py-1.5">
                      <Link
                        href="/stats"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#3B2415] hover:bg-[#FDF6EC] transition-colors"
                      >
                        <LayoutDashboard size={14} className="text-[#C17D3C]" />
                        My Sanctuary
                      </Link>
                      <Link
                        href="/logout"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="ml-1 flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#C17D3C] hover:bg-[#9B6020] text-white text-xs font-semibold transition-colors"
              >
                <User size={13} />
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
