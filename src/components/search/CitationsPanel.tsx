import type { Citation } from "@/lib/types";
import Link from "next/link";
import { ExternalLink, BookOpen } from "lucide-react";

interface CitationsPanelProps {
  citations: Citation[];
}

export default function CitationsPanel({ citations }: CitationsPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F5E6D0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={13} className="text-[#C17D3C]" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#3B2415]">Citations</h3>
        </div>
        <span className="text-[10px] bg-[#FDF6EC] border border-[#E8D5B8] text-[#C17D3C] font-bold px-2 py-0.5 rounded-full">
          {citations.length} Sources
        </span>
      </div>

      <div className="flex flex-col divide-y divide-[#F5E6D0]">
        {citations.map((c, i) => (
          <div key={c.id} className="p-4 hover:bg-[#FDF6EC]/60 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F5E6D0] text-[#C17D3C] text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-xs font-bold text-[#C17D3C]">{c.id}</p>
              </div>
              {c.href && (
                <Link href={c.href} className="text-[#B8906A] hover:text-[#C17D3C] shrink-0 transition-colors">
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>
            <p className="text-xs text-[#5C3A20] font-display italic leading-relaxed line-clamp-2 pl-7">
              &ldquo;{c.verse}&rdquo;
            </p>
            {c.href && (
              <Link
                href={c.href}
                className="mt-2 pl-7 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#8B6344] hover:text-[#C17D3C] transition-colors"
              >
                <span className="w-4 h-px bg-current" />
                Read in Context
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
