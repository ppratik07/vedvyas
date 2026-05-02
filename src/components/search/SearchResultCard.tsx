import type { SearchResult } from "@/lib/types";
import Link from "next/link";
import { Share2, BookmarkPlus, Sparkles } from "lucide-react";

interface SearchResultCardProps {
  result: SearchResult;
  query: string;
}

export default function SearchResultCard({ result, query }: SearchResultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#F5E6D0]">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-[#FDF6EC] border border-[#E8D5B8] text-[#C17D3C] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            <Sparkles size={10} />
            Neural Synthesis
          </div>
        </div>
        <h2 className="font-display text-xl font-semibold text-[#3B2415] leading-snug">
          On the Nature of <em className="font-display text-[#C17D3C]">{query}</em>
        </h2>
        <p className="text-xs text-[#8B6344] mt-1">
          Cross-referenced analysis across {result.citations.length} scriptural source{result.citations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Synthesis body */}
      <div className="px-6 py-5">
        <div
          className="text-sm text-[#3B2415] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: result.synthesis }}
        />
      </div>

      {/* Footnotes */}
      {result.citations.length > 0 && (
        <div className="mx-6 mb-5 bg-[#FDF6EC] rounded-xl border border-[#F0DEC8] p-4">
          <p className="text-[10px] uppercase tracking-widest text-[#B8906A] font-bold mb-2.5">
            Footnotes &amp; Context
          </p>
          <ol className="flex flex-col gap-2">
            {result.citations.map((c, i) => (
              <li key={c.id} className="text-xs text-[#5C3A20] flex gap-2.5">
                <span className="text-[#C17D3C] font-bold w-4 shrink-0 mt-0.5">{i + 1}.</span>
                <span className="leading-relaxed">
                  <span className="font-semibold">{c.id}</span> — {c.context}.
                  {c.href && (
                    <Link href={c.href} className="ml-1 text-[#C17D3C] hover:underline">
                      Read →
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-6 pb-5 pt-1 border-t border-[#F5E6D0] flex gap-4">
        <button className="flex items-center gap-1.5 text-sm text-[#8B6344] hover:text-[#C17D3C] font-medium transition-colors">
          <Share2 size={14} /> Share Insight
        </button>
        <button className="flex items-center gap-1.5 text-sm text-[#8B6344] hover:text-[#C17D3C] font-medium transition-colors">
          <BookmarkPlus size={14} /> Save to Journal
        </button>
      </div>
    </div>
  );
}
