"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ScriptureCard from "@/components/explorer/ScriptureCard";
import { SCRIPTURES } from "@/lib/data/scriptures";
import { getProgress } from "@/lib/store/userProgress";
import type { Scripture } from "@/lib/types";
import { Library } from "lucide-react";
import { motion } from "framer-motion";

export default function CollectionsPage() {
  const [scriptures, setScriptures] = useState<Scripture[]>(
    SCRIPTURES.map((s) => ({ ...s, completionPercent: 0, lastReadLabel: "Not started" }))
  );

  useEffect(() => {
    const p = getProgress();
    setScriptures(
      SCRIPTURES.map((s) => ({
        ...s,
        completionPercent: p.scriptureProgress[s.id] ?? 0,
        lastReadLabel: p.scriptureProgress[s.id] ? s.lastReadLabel : "Not started",
      }))
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar title="Collections" subtitle="Sacred Library" />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#E8D5B8] pb-5 mb-6">
              <div className="flex items-center gap-2.5 mb-1">
                <Library size={18} className="text-[#C17D3C]" />
                <p className="text-xs uppercase tracking-widest text-[#B8906A] font-semibold">All Scriptures</p>
              </div>
              <h1 className="font-display text-3xl font-bold text-[#3B2415]">Sacred Collections</h1>
              <p className="text-sm text-[#8B6344] mt-1">
                Browse and study from {scriptures.length} ancient sacred texts.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
            >
              {scriptures.map((s, i) => (
                <ScriptureCard key={s.id} scripture={s} index={i} />
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
