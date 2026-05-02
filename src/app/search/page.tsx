"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";
import SearchResultCard from "@/components/search/SearchResultCard";
import CitationsPanel from "@/components/search/CitationsPanel";
import RelatedConcepts from "@/components/search/RelatedConcepts";
import type { SearchResult } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doSearch = async (q: string) => {
    setQuery(q);
    setIsLoading(true);
    setError(null);
    router.replace(`/search?q=${encodeURIComponent(q)}`, { scroll: false });

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data: SearchResult = await res.json();
      setResult(data);
    } catch (err) {
      setError("Unable to complete the search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-search on initial load if query present
  useEffect(() => {
    if (initialQuery) doSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar title="Seek Wisdom" subtitle="Deep Search" />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            {/* Hero */}
            <AnimatePresence>
              {!result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-10"
                >
                  {/* Decorative Sanskrit circle */}
                  <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-[#F5E6D0] to-[#EDD5B0] border border-[#E8D5B8] flex items-center justify-center shadow-inner">
                    <span className="font-display text-4xl text-[#C17D3C]">ॐ</span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold text-[#3B2415] mb-2">Seek Wisdom</h1>
                  <p className="text-[#8B6344] text-sm max-w-sm mx-auto leading-relaxed">
                    Explore the deep interconnectedness of ancient scriptures through
                    neural-semantic cross-reference analysis.
                  </p>
                  {/* Decorative divider */}
                  <div className="flex items-center gap-3 max-w-xs mx-auto mt-5">
                    <div className="flex-1 h-px bg-[#E8D5B8]" />
                    <span className="text-[#C17D3C] text-xs">✦</span>
                    <div className="flex-1 h-px bg-[#E8D5B8]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <SearchBar initialQuery={query} onSearch={doSearch} isLoading={isLoading} />

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full border-4 border-[#E8D5B8] border-t-[#C17D3C] animate-spin" />
                  <div className="absolute inset-2 rounded-full bg-[#FDF6EC] flex items-center justify-center">
                    <span className="font-display text-base text-[#C17D3C]">ॐ</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#3B2415]">Consulting the scriptures…</p>
                  <p className="text-xs text-[#8B6344] mt-1">Performing neural-semantic analysis</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* Results */}
            <AnimatePresence mode="wait">
              {result && !isLoading && (
                <motion.div
                  key={result.synthesis.slice(0, 20)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                >
                  <div className="lg:col-span-2 flex flex-col gap-5">
                    <SearchResultCard result={result} query={query} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <CitationsPanel citations={result.citations} />
                    <RelatedConcepts
                      concepts={result.relatedConcepts}
                      visualStudyTitle={result.visualStudyTitle}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#E8D5B8] border-t-[#C17D3C] rounded-full animate-spin" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
