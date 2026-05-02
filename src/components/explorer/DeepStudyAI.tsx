"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const EXAMPLES = [
  { label: "Karma explained", q: "What is the nature of Karma in the Bhagavad Gita?" },
  { label: "Nature of Brahman", q: "Nature of Brahman across the Upanishads" },
  { label: "Dharma & duty", q: "Purpose of Dharma in Vedic tradition" },
];

export default function DeepStudyAI() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1E0F06 0%, #2C1A0E 60%, #3D2312 100%)" }}>
      {/* Decorative Om watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[110px] leading-none select-none pointer-events-none opacity-[0.06] font-display">
        ॐ
      </div>
      {/* Top amber glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

      <div className="relative p-6">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#C17D3C]/20 border border-[#C17D3C]/30 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-[#E8A855]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-white leading-tight">Deep Study AI</h2>
            <p className="text-white/50 text-xs mt-0.5 leading-relaxed max-w-sm">
              Ask philosophical questions across multiple scriptures — neural-semantic cross-reference analysis.
            </p>
          </div>
        </div>

        {/* Search form */}
        <form onSubmit={handleSubmit}>
          <div
            className={`flex items-center gap-2 rounded-xl border transition-all duration-200 px-4 py-3 ${
              focused
                ? "bg-white/12 border-[#C17D3C]/70 shadow-[0_0_0_3px_rgba(193,125,60,0.12)]"
                : "bg-white/8 border-white/15"
            }`}
          >
            <Search size={15} className="text-white/40 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ask a philosophical question…"
              className="flex-1 bg-transparent text-white placeholder:text-white/35 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="bg-[#C17D3C] hover:bg-[#A86830] disabled:opacity-40 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
            >
              Analyze <ArrowRight size={12} />
            </button>
          </div>
        </form>

        {/* Example chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3.5">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Try:</span>
          {EXAMPLES.map(({ label, q }) => (
            <button
              key={label}
              onClick={() => router.push(`/search?q=${encodeURIComponent(q)}`)}
              className="text-[11px] text-white/55 hover:text-white/90 bg-white/8 hover:bg-white/14 border border-white/12 hover:border-white/25 px-3 py-1 rounded-full transition-all"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
