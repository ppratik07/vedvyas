"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            {/* Hero */}
            {!result && !isLoading && (
              <div className="text-center py-8">
                <h1 className="font-display text-4xl font-semibold text-[#C17D3C] mb-2">Seek Wisdom</h1>
                <p className="text-[#8B6344] text-sm max-w-md mx-auto">
                  Explore the deep interconnectedness of ancient scriptures through
                  neural-semantic analysis.
                </p>
              </div>
            )}

            <SearchBar initialQuery={query} onSearch={doSearch} isLoading={isLoading} />

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-10 h-10 border-3 border-[#E8D5B8] border-t-[#C17D3C] rounded-full animate-spin" />
                <p className="text-sm text-[#8B6344]">Consulting the scriptures…</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* Results */}
            {result && !isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
              </div>
            )}
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
