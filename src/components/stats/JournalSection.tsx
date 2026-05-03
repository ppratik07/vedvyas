"use client";

import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";
import { PenLine, Clock } from "lucide-react";

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return "Yesterday";
  return `${Math.floor(hours / 24)}d ago`;
}

export default function JournalSection() {
  const { progress } = useProgress();
  if (!progress) return null;

  const recent = progress.journal.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#F5E6D0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenLine size={14} className="text-[#C17D3C]" />
          <h3 className="font-semibold text-[#3B2415] text-sm">My Journal</h3>
        </div>
        <Link href="/stats" className="text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium transition-colors">
          View All
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="px-5 py-8 flex flex-col items-center gap-2 text-center">
          <PenLine size={22} className="text-[#D4B896]" />
          <p className="text-sm font-medium text-[#8B6344]">No journal entries yet</p>
          <p className="text-xs text-[#B8906A]">Reflect on verses while reading to add entries.</p>
        </div>
      ) : (
      <div className="flex flex-col divide-y divide-[#F5E6D0]">
        {recent.map((entry) => (
          <div key={entry.id} className="p-5 hover:bg-[#FDF6EC]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#C17D3C] bg-[#FDF6EC] px-2 py-0.5 rounded">
                {entry.reference}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#B8906A]">
                <Clock size={9} />
                {timeAgo(entry.createdAt)}
              </span>
            </div>
            <p className="font-display italic text-[#3B2415] text-sm leading-relaxed mb-2.5">&ldquo;{entry.quote}&rdquo;</p>
            <p className="text-xs text-[#5C3A20] leading-relaxed border-l-2 border-[#E8D5B8] pl-3">
              {entry.note}
            </p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
