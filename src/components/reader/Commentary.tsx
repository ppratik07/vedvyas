"use client";

import type { GitaVerse } from "@/lib/types";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface CommentaryProps {
  verse: GitaVerse;
}

type CommentaryKey = "prabhu" | "sankar" | "siva" | "raman";

const COMMENTARY_TABS: { id: CommentaryKey; label: string }[] = [
  { id: "prabhu", label: "Prabhupada" },
  { id: "sankar", label: "Shankara" },
  { id: "siva", label: "Sivananda" },
  { id: "raman", label: "Ramanuja" },
];

export default function Commentary({ verse }: CommentaryProps) {
  const [activeTab, setActiveTab] = useState<CommentaryKey>("sankar");
  const [expanded, setExpanded] = useState(false);

  const entry = verse[activeTab];
  const text = entry?.ec || entry?.et || "";
  const author = entry?.author || "";

  const PREVIEW_CHARS = 300;
  const showExpand = text.length > PREVIEW_CHARS;
  const displayText = expanded || !showExpand ? text : text.substring(0, PREVIEW_CHARS) + "…";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#3B2415] uppercase tracking-wider">Commentary</h3>
        <div className="flex gap-1">
          {COMMENTARY_TABS.map((t) => {
            const hasData = !!(verse[t.id]?.ec || verse[t.id]?.et);
            if (!hasData) return null;
            return (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setExpanded(false); }}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  activeTab === t.id
                    ? "bg-[#C17D3C] text-white"
                    : "text-[#8B6344] hover:text-[#C17D3C]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {entry ? (
        <div className="bg-white rounded-xl p-4 border border-[#E8D5B8]">
          {author && (
            <p className="text-xs text-[#B8906A] font-medium mb-2 uppercase tracking-wider">{author}</p>
          )}
          <p className="text-sm text-[#3B2415] leading-relaxed">{displayText}</p>
          {showExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex items-center gap-1 text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium"
            >
              {expanded ? "Show less" : "Read full exposition"}
              <ExternalLink size={12} />
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-[#B8906A] italic">Commentary not available for this verse.</p>
      )}
    </div>
  );
}
