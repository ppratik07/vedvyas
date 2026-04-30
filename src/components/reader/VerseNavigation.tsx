"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { GITA_VERSE_COUNTS } from "@/lib/data/scriptures";

interface VerseNavigationProps {
  scripture: string;
  chapter: number;
  verse: number;
}

export default function VerseNavigation({ scripture, chapter, verse }: VerseNavigationProps) {
  const router = useRouter();
  const verseCount = scripture === "bhagavad-gita" ? (GITA_VERSE_COUNTS[chapter] ?? 30) : 30;
  const chapterCount = scripture === "bhagavad-gita" ? 18 : 10;

  const goTo = (ch: number, v: number) => {
    router.push(`/reader/${scripture}/${ch}/${v}`);
  };

  const prev = () => {
    if (verse > 1) goTo(chapter, verse - 1);
    else if (chapter > 1) goTo(chapter - 1, GITA_VERSE_COUNTS[chapter - 1] ?? 1);
  };

  const next = () => {
    if (verse < verseCount) goTo(chapter, verse + 1);
    else if (chapter < chapterCount) goTo(chapter + 1, 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4 border-t border-[#E8D5B8]">
      <button
        onClick={prev}
        disabled={chapter === 1 && verse === 1}
        className="p-2 rounded-full hover:bg-[#F5E6D0] text-[#8B6344] disabled:opacity-30 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Chapter & Verse selectors */}
      <div className="flex items-center gap-2">
        <select
          value={chapter}
          onChange={(e) => goTo(Number(e.target.value), 1)}
          className="appearance-none bg-white border border-[#E8D5B8] rounded-lg px-3 py-1.5 pr-7 text-sm text-[#3B2415] cursor-pointer relative"
          style={{ backgroundImage: "none" }}
        >
          {Array.from({ length: chapterCount }, (_, i) => i + 1).map((ch) => (
            <option key={ch} value={ch}>Chapter {ch}</option>
          ))}
        </select>

        <select
          value={verse}
          onChange={(e) => goTo(chapter, Number(e.target.value))}
          className="appearance-none bg-white border border-[#E8D5B8] rounded-lg px-3 py-1.5 pr-7 text-sm text-[#3B2415] cursor-pointer"
          style={{ backgroundImage: "none" }}
        >
          {Array.from({ length: verseCount }, (_, i) => i + 1).map((v) => (
            <option key={v} value={v}>Verse {v}</option>
          ))}
        </select>
      </div>

      <button
        onClick={next}
        disabled={chapter === chapterCount && verse === verseCount}
        className="p-2 rounded-full hover:bg-[#F5E6D0] text-[#8B6344] disabled:opacity-30 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
