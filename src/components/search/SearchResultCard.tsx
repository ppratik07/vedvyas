import type { SearchResult } from "@/lib/types";
import Link from "next/link";
import { Share2, BookmarkPlus } from "lucide-react";

interface SearchResultCardProps {
  result: SearchResult;
  query: string;
}

export default function SearchResultCard({ result, query }: SearchResultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-3 border-b border-[#F5E6D0] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C17D3C] bg-[#FDF6EC] border border-[#E8D5B8] px-2 py-0.5 rounded">
              ✦ Neural Synthesis
            </span>
          </div>
          <h2 className="font-display text-lg font-semibold text-[#3B2415] leading-tight">
            On the Nature of <em className="font-display">{query}</em>
          </h2>
        </div>
      </div>

      {/* Synthesis body */}
      <div className="px-6 py-5">
        <div
          className="text-sm text-[#3B2415] leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: result.synthesis }}
        />
      </div>

      {/* Footnotes */}
      {result.citations.length > 0 && (
        <div className="px-6 pb-4 border-t border-[#F5E6D0] pt-4">
          <p className="text-xs uppercase tracking-widest text-[#B8906A] font-semibold mb-2">
            Footnotes &amp; Context
          </p>
          <ol className="flex flex-col gap-1">
            {result.citations.map((c, i) => (
              <li key={c.id} className="text-xs text-[#5C3A20] flex gap-2">
                <span className="text-[#C17D3C] font-semibold w-4 shrink-0">{i + 1}</span>
                <span>
                  Reference to {c.id} — {c.context}.
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-6 pb-5 flex gap-3">
        <button className="flex items-center gap-1.5 text-sm text-[#8B6344] hover:text-[#C17D3C] font-medium">
          <Share2 size={14} /> Share Insight
        </button>
        <button className="flex items-center gap-1.5 text-sm text-[#8B6344] hover:text-[#C17D3C] font-medium">
          <BookmarkPlus size={14} /> Save to Journal
        </button>
      </div>
    </div>
  );
}
