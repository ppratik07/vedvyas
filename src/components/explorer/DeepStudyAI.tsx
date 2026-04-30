"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function DeepStudyAI() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const examples = ["How do Vedas and Gita differ on the concept of Karma?", "Nature of Brahman", "Purpose of Dharma"];

  return (
    <section className="bg-[#2C1A0E] rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Background icon */}
      <div className="absolute right-6 bottom-0 opacity-5 text-[120px] select-none pointer-events-none">
        🕉
      </div>

      <h2 className="font-display text-xl font-semibold mb-1">Deep Study AI</h2>
      <p className="text-white/60 text-sm mb-4">
        Ask complex philosophical questions across multiple scriptures simultaneously using our contextual search engine.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How do Vedas and Gita differ on the concept of Karma?"
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C17D3C] focus:ring-1 focus:ring-[#C17D3C]"
        />
        <button
          type="submit"
          className="bg-[#C17D3C] hover:bg-[#9B6020] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Search size={16} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-3">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => router.push(`/search?q=${encodeURIComponent(ex)}`)}
            className="text-xs text-white/50 hover:text-white/80 border border-white/15 hover:border-white/30 px-3 py-1 rounded-full transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
    </section>
  );
}
