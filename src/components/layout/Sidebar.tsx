"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Search, Compass, LineChart, Settings } from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Library",        href: "/",       icon: BookMarked, match: (p: string) => p === "/" },
  { label: "Deep Search",    href: "/search", icon: Search,     match: (p: string) => p.startsWith("/search") },
  { label: "Journal",        href: "/stats",  icon: Compass,    match: (p: string) => false },
  { label: "Scholarly Stats",href: "/stats",  icon: LineChart,  match: (p: string) => p.startsWith("/stats") },
];

interface SidebarProps {
  title?: string;
  subtitle?: string;
}

export default function Sidebar({ title = "Ved Vyas", subtitle = "Digital Sanctuary" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-44 shrink-0 flex flex-col border-r border-[#E8D5B8] bg-[#FDF6EC] min-h-full py-5 px-2.5">
      {/* Workspace title */}
      <div className="mb-6 px-2.5 py-1">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#B8906A] font-semibold">{subtitle}</p>
        <p className="font-display text-[17px] font-bold text-[#3B2415] leading-snug mt-0.5">{title}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5">
        {SIDEBAR_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                active
                  ? "bg-[#F0DEC8] text-[#9B6020]"
                  : "text-[#8B6344] hover:bg-[#F5E6D0] hover:text-[#3B2415]"
              }`}
            >
              <Icon
                size={15}
                className={`shrink-0 transition-colors ${active ? "text-[#C17D3C]" : "text-[#B8906A] group-hover:text-[#8B6344]"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="mt-4 pt-4 border-t border-[#E8D5B8]">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-[#8B6344] hover:bg-[#F5E6D0] hover:text-[#3B2415] transition-all"
        >
          <Settings size={15} className="text-[#B8906A] shrink-0" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
