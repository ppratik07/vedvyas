"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Share2, Bookmark } from "lucide-react";
import VerseDisplay from "@/components/reader/VerseDisplay";
import Commentary from "@/components/reader/Commentary";
import ScholarlyNote from "@/components/reader/ScholarlyNote";
import VerseNavigation from "@/components/reader/VerseNavigation";
import type { GitaVerse } from "@/lib/types";

interface ReaderClientProps {
  verse: GitaVerse;
  scripture: string;
  chapter: number;
  verseNum: number;
}

export default function ReaderClient({ verse, scripture, chapter, verseNum }: ReaderClientProps) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-col flex-1">
      {/* Top toolbar */}
      <div className="flex items-center justify-end gap-2 p-3 border-b border-[#E8D5B8]">
        <button
          onClick={() => setFontSize((s) => Math.min(s + 2, 28))}
          className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded hover:bg-[#F5E6D0]"
          title="Increase font size"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setFontSize((s) => Math.max(s - 2, 12))}
          className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded hover:bg-[#F5E6D0]"
          title="Decrease font size"
        >
          <ZoomOut size={16} />
        </button>
        <button className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded hover:bg-[#F5E6D0]">
          <Bookmark size={16} />
        </button>
        <button className="p-1.5 text-[#8B6344] hover:text-[#C17D3C] rounded hover:bg-[#F5E6D0]">
          <Share2 size={16} />
        </button>
      </div>

      {/* Main reading area */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Left: verse number */}
        <div className="w-16 shrink-0 flex items-start justify-center pt-8 text-[#B8906A] text-sm font-medium">
          {chapter}.{verseNum}
        </div>

        {/* Center: verse content */}
        <div className="flex-1 min-w-0 px-4 py-8 flex flex-col gap-8">
          <VerseDisplay verse={verse} fontSize={fontSize} />
          <Commentary verse={verse} />
        </div>

        {/* Right: scholarly notes */}
        <div className="w-56 shrink-0 p-4 pt-8 hidden lg:block">
          <ScholarlyNote />
        </div>
      </div>

      {/* Navigation bar */}
      <VerseNavigation scripture={scripture} chapter={chapter} verse={verseNum} />
    </div>
  );
}
