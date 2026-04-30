"use client";

import type { GitaVerse } from "@/lib/types";
import { useState } from "react";

interface VerseDisplayProps {
  verse: GitaVerse;
  fontSize: number;
}

type Tab = "transliteration" | "hindi" | "english";

export default function VerseDisplay({ verse, fontSize }: VerseDisplayProps) {
  const [tab, setTab] = useState<Tab>("transliteration");

  const englishText =
    verse.prabhu?.et || verse.siva?.et || verse.san?.et || verse.adi?.et || verse.gambir?.et || "";
  const hindiText =
    verse.tej?.ht || verse.rams?.ht || verse.sankar?.ht || "";

  const TABS: { id: Tab; label: string }[] = [
    { id: "transliteration", label: "Transliteration" },
    { id: "hindi", label: "Hindi" },
    { id: "english", label: "English" },
  ];

  return (
    <div className="flex-1">
      {/* Tab bar */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#E8D5B8]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? "border-[#C17D3C] text-[#C17D3C]"
                : "border-transparent text-[#8B6344] hover:text-[#3B2415]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Verse content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Sanskrit */}
        <p
          className="font-display text-[#3B2415] leading-relaxed mb-4"
          style={{ fontSize: `${fontSize + 4}px` }}
        >
          {verse.slok.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < verse.slok.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* Verse number badge */}
        <p className="text-[#B8906A] text-sm mb-8">
          {verse.chapter}.{verse.verse}
        </p>

        {/* Tab content */}
        {tab === "transliteration" && (
          <p
            className="font-display italic text-[#5C3A20] leading-relaxed"
            style={{ fontSize: `${fontSize}px` }}
          >
            {verse.transliteration}
          </p>
        )}

        {tab === "hindi" && (
          <p
            className="text-[#3B2415] leading-relaxed"
            style={{ fontSize: `${fontSize}px` }}
          >
            {hindiText || "Hindi translation not available."}
          </p>
        )}

        {tab === "english" && (
          <blockquote
            className="border-l-4 border-[#C17D3C] pl-6 text-left bg-[#FDF6EC] rounded-r-xl p-4"
            style={{ fontSize: `${fontSize}px` }}
          >
            <p className="text-[#3B2415] leading-relaxed">{englishText || "English translation not available."}</p>
          </blockquote>
        )}
      </div>
    </div>
  );
}
