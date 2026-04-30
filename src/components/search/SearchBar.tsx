"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";

const SUGGESTIONS = ["Purpose of Dharma", "Meditation in Vedas", "Nature of Brahman", "What is Moksha?"];

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ initialQuery = "", onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white border border-[#E8D5B8] rounded-xl px-4 shadow-sm focus-within:border-[#C17D3C] focus-within:ring-1 focus-within:ring-[#C17D3C]">
          <Search size={18} className="text-[#B8906A] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question (e.g., 'What does Gita say about Karma?')"
            className="flex-1 py-3 bg-transparent text-[#3B2415] placeholder:text-[#B8906A] text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex items-center gap-2 bg-[#3B2415] hover:bg-[#2C1A0E] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          Analyze
        </button>
      </form>

      {/* Suggestions */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-[#B8906A]">Try searching:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setQuery(s); onSearch(s); }}
            className="text-xs text-[#C17D3C] hover:text-[#9B6020] underline underline-offset-2"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
