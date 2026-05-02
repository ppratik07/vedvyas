"use client";

import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";
import { Bookmark, BookMarked } from "lucide-react";

export default function BookmarksSection() {
  const { progress } = useProgress();
  if (!progress) return null;

  const bookmarks = progress.bookmarks.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#F5E6D0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookMarked size={14} className="text-[#C17D3C]" />
          <h3 className="font-semibold text-[#3B2415] text-sm">Bookmarks</h3>
        </div>
        <button className="text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium transition-colors">Manage</button>
      </div>

      <div className="flex flex-col divide-y divide-[#F5E6D0]">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="px-5 py-3.5 flex gap-3 hover:bg-[#FDF6EC]/50 transition-colors">
            <div className="w-7 h-7 bg-[#FDF6EC] border border-[#E8D5B8] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Bookmark size={12} className="text-[#C17D3C] fill-[#C17D3C]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#3B2415] leading-tight truncate">{bm.title}</p>
              <p className="text-[10px] text-[#8B6344] mt-0.5 truncate">{bm.reference} — {bm.preview}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {bm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-wider font-bold bg-[#F5E6D0] text-[#8B6344] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
