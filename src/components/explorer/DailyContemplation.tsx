import type { GitaVerse } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";

interface DailyContemplationProps {
  verse: GitaVerse;
  chapterRef: string;
}

export default function DailyContemplation({ verse, chapterRef }: DailyContemplationProps) {
  const englishText =
    verse.prabhu?.et ||
    verse.siva?.et ||
    verse.san?.et ||
    verse.adi?.et ||
    "";

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#2C1A0E] text-white min-h-[260px]">
      {/* Background Sanskrit text watermark */}
      <div className="absolute inset-0 opacity-10 font-display text-[10px] leading-5 p-4 overflow-hidden select-none pointer-events-none whitespace-pre-wrap break-all">
        {verse.slok.repeat(8)}
      </div>

      {/* Right side portrait area */}
      <div className="absolute right-0 top-0 bottom-0 w-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-l from-amber-900/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(ellipse at center, #C17D3C 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-center pb-2 opacity-30">
          <span className="text-8xl select-none">🪷</span>
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-[calc(100%-12rem)]">
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-900/40 px-3 py-1 rounded-full border border-amber-700/50">
            ← Daily Contemplation
          </span>
          <p className="text-amber-300 text-sm mt-1 font-display italic">
            Bhagavad Gita, {verse.chapter}.{verse.verse}
          </p>
        </div>

        {/* Transliteration preview */}
        <p className="font-display text-white/90 text-sm italic mb-3 leading-relaxed">
          &ldquo;{verse.transliteration.split("\n")[0]}&rdquo;
        </p>

        {/* English translation */}
        {englishText && (
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            &ldquo;{englishText.substring(0, 160)}{englishText.length > 160 ? "…" : ""}&rdquo;
          </p>
        )}

        <div className="flex gap-3">
          <Link
            href={chapterRef}
            className="flex items-center gap-2 bg-[#C17D3C] hover:bg-[#9B6020] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Read Full Chapter
          </Link>
          <button className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Bookmark size={14} />
            Save Verse
          </button>
        </div>
      </div>
    </div>
  );
}
