"use client";

import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function BookmarksSection() {
  const { progress } = useProgress();
  if (!progress) return null;

  const bookmarks = progress.bookmarks.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#3B2415] text-sm">Bookmarks</h3>
        <button className="text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium">Manage</button>
      </div>

      <div className="flex flex-col gap-2">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="bg-white rounded-xl border border-[#E8D5B8] p-3 shadow-sm flex gap-3">
            <div className="w-6 h-6 bg-[#FDF6EC] rounded flex items-center justify-center shrink-0 mt-0.5">
              <Bookmark size={12} className="text-[#C17D3C] fill-[#C17D3C]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#3B2415] leading-tight">{bm.title}</p>
              <p className="text-[10px] text-[#8B6344] mt-0.5">{bm.reference} — {bm.preview}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {bm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-wider font-semibold bg-[#F5E6D0] text-[#8B6344] px-2 py-0.5 rounded-full"
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
