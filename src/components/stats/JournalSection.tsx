"use client";

import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  if (hours < 48) return "Yesterday";
  return `${Math.floor(hours / 24)} days ago`;
}

export default function JournalSection() {
  const { progress } = useProgress();
  if (!progress) return null;

  const recent = progress.journal.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#3B2415] text-sm">My Journal</h3>
        <Link href="/stats" className="text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium">View All</Link>
      </div>

      <div className="flex flex-col gap-3">
        {recent.map((entry) => (
          <div key={entry.id} className="bg-white rounded-xl border border-[#E8D5B8] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C17D3C]">
                {entry.reference}
              </span>
              <span className="text-[10px] text-[#B8906A]">{timeAgo(entry.createdAt)}</span>
            </div>
            <p className="font-display italic text-[#3B2415] text-sm leading-relaxed mb-2">{entry.quote}</p>
            <p className="text-xs text-[#5C3A20] leading-relaxed border-l-2 border-[#E8D5B8] pl-3">
              Note: {entry.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
