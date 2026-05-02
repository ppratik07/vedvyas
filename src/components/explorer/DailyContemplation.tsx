import type { GitaVerse } from "@/lib/types";
import Link from "next/link";
import { Bookmark } from "lucide-react";

interface DailyContemplationProps {
  verse: GitaVerse;
  chapterRef: string;
}

export default function DailyContemplation({ verse, chapterRef }: DailyContemplationProps) {
  const englishText =
    verse.prabhu?.et || verse.siva?.et || verse.san?.et || verse.adi?.et || "";
  const firstLine = verse.transliteration.split("\n")[0];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1E0F06] text-white" style={{ minHeight: 280 }}>
      {/* Sanskrit watermark background */}
      <div
        className="absolute inset-0 select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <p className="font-display text-[9px] leading-5 opacity-[0.07] whitespace-pre-wrap break-all p-4 text-amber-100">
          {(verse.slok + " ").repeat(20)}
        </p>
      </div>

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 75% 50%, rgba(193,125,60,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Right deity portrait */}
      <div className="absolute right-0 top-0 bottom-0 w-52 flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(30,15,6,0) 0%, rgba(30,15,6,0.6) 100%)",
          }}
        />
        <span
          className="text-[130px] select-none opacity-25 mb-[-10px] relative z-10"
          style={{ filter: "sepia(80%) saturate(120%)" }}
        >
          🪷
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-7 pr-56">
        {/* Badge + reference */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-400 bg-amber-900/30 border border-amber-700/40 px-3 py-1 rounded-full">
            ← Daily Contemplation
          </span>
          <span className="font-display text-amber-300/80 text-sm italic">
            Bhagavad Gita, {verse.chapter}.{verse.verse}
          </span>
        </div>

        {/* Transliteration */}
        <p className="font-display text-[15px] italic text-white/85 leading-relaxed mb-2">
          &ldquo;{firstLine}&rdquo;
        </p>

        {/* English */}
        {englishText && (
          <p className="text-white/55 text-[13px] leading-relaxed mb-6 max-w-xl">
            &ldquo;{englishText.length > 180 ? englishText.substring(0, 180) + "…" : englishText}&rdquo;
          </p>
        )}

        <div className="flex gap-3">
          <Link
            href={chapterRef}
            className="inline-flex items-center gap-2 bg-[#C17D3C] hover:bg-[#A86830] active:bg-[#9B6020] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-amber-900/30"
          >
            Read Full Chapter
          </Link>
          <button className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            <Bookmark size={14} />
            Save Verse
          </button>
        </div>
      </div>
    </div>
  );
}
