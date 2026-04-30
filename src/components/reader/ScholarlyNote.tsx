"use client";

import { useState } from "react";
import { MessageSquarePlus, Quote } from "lucide-react";

interface ScholarlyNoteProps {
  authorName?: string;
  quote?: string;
}

export default function ScholarlyNote({
  authorName = "Dr. Jay Deshmukh",
  quote = "This verse forms the cornerstone of Nishkama Karma in the Bhagavad Gita's ethical framework.",
}: ScholarlyNoteProps) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (note.trim()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setNote("");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8D5B8] p-4 flex flex-col gap-3 shadow-sm">
      {/* Scholar quote */}
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-[#F5E6D0] flex items-center justify-center shrink-0">
          <Quote size={12} className="text-[#C17D3C]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#3B2415]">{authorName}</p>
          <p className="text-xs text-[#5C3A20] italic leading-relaxed mt-0.5">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>

      <div className="border-t border-[#F5E6D0] pt-3">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a scholarly note…"
          className="w-full text-xs text-[#3B2415] placeholder:text-[#B8906A] bg-transparent border-none outline-none resize-none leading-relaxed"
          rows={2}
        />
        {note.trim() && (
          <button
            onClick={handleSave}
            className="text-xs text-[#C17D3C] font-medium hover:text-[#9B6020]"
          >
            {saved ? "Saved!" : "Save note"}
          </button>
        )}
      </div>
    </div>
  );
}
