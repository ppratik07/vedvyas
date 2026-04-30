import type { Citation } from "@/lib/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface CitationsPanelProps {
  citations: Citation[];
}

export default function CitationsPanel({ citations }: CitationsPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#3B2415]">Citations</h3>
        <span className="text-xs bg-[#F5E6D0] text-[#C17D3C] font-semibold px-2 py-0.5 rounded-full">
          {citations.length} Sources
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {citations.map((c) => (
          <div key={c.id} className="border border-[#F5E6D0] rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#C17D3C]">{c.id}</p>
                <p className="text-xs text-[#5C3A20] font-display italic mt-0.5 leading-relaxed line-clamp-2">
                  &ldquo;{c.verse}&rdquo;
                </p>
              </div>
              {c.href && (
                <Link href={c.href} className="text-[#B8906A] hover:text-[#C17D3C] shrink-0 mt-0.5">
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>
            {c.href && (
              <Link
                href={c.href}
                className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-[#8B6344] hover:text-[#C17D3C]"
              >
                <span className="w-3 h-px bg-current" /> Read in Context
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
