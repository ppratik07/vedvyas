"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Compass, Search, LineChart, Settings, User } from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Library", href: "/", icon: BookMarked, match: (p: string) => p === "/" },
  { label: "Deep Search", href: "/search", icon: Search, match: (p: string) => p.startsWith("/search") },
  { label: "Journal", href: "/stats", icon: Compass, match: (p: string) => p.startsWith("/stats") && false },
  { label: "Scholarly Stats", href: "/stats", icon: LineChart, match: (p: string) => p.startsWith("/stats") },
];

interface SidebarProps {
  title?: string;
  subtitle?: string;
}

export default function Sidebar({ title = "Ved Vyas", subtitle = "Digital Sanctuary" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-40 shrink-0 flex flex-col border-r border-[#E8D5B8] bg-[#FDF6EC] min-h-screen py-6 px-3">
      {/* Title */}
      <div className="mb-8 px-2">
        <p className="text-xs uppercase tracking-widest text-[#B8906A] font-medium">{subtitle}</p>
        <p className="font-display text-lg font-semibold text-[#3B2415] leading-tight">{title}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1">
        {SIDEBAR_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#F5E6D0] text-[#C17D3C] border-l-2 border-[#C17D3C]"
                  : "text-[#8B6344] hover:bg-[#F5E6D0] hover:text-[#3B2415]"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom settings */}
      <div className="mt-auto flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#8B6344] hover:bg-[#F5E6D0] hover:text-[#3B2415]"
        >
          <Settings size={16} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
