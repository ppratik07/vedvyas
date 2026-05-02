"use client";

import type { Scripture } from "@/lib/types";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface ScriptureCardProps {
  scripture: Scripture;
  index?: number;
}

export default function ScriptureCard({ scripture, index = 0 }: ScriptureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_8px_rgba(59,36,21,0.07)] hover:shadow-[0_6px_24px_rgba(59,36,21,0.14)] transition-shadow duration-300 flex flex-col"
    >
      {/* Cover image */}
      <div className={`relative h-40 bg-gradient-to-br ${scripture.coverGradient} flex flex-col items-center justify-center overflow-hidden`}>
        {/* Glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.6) 6px, rgba(255,255,255,0.6) 7px)`,
          }}
        />
        {/* Emoji icon with glow */}
        <motion.span
          className="text-5xl select-none drop-shadow-lg block"
          style={{ filter: "drop-shadow(0 0 12px rgba(255,200,100,0.5))" }}
          whileHover={{ scale: 1.12, transition: { duration: 0.25 } }}
        >
          {scripture.coverEmoji}
        </motion.span>
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-white font-display font-bold text-base leading-tight drop-shadow">
            {scripture.title}
          </h3>
          <p className="text-white/65 text-xs">{scripture.subtitle}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center text-[11px] text-[#8B6344] mb-1.5">
            <span>Completion</span>
            <span className="font-semibold text-[#5C3A20]">{scripture.completionPercent}%</span>
          </div>
          <div className="h-1.5 bg-[#F0E0C8] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C17D3C] to-[#E8A855] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${scripture.completionPercent}%` }}
              transition={{ duration: 0.8, delay: index * 0.06 + 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Last read + play */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-[#B8906A] font-semibold">Last Read</p>
            <p className="text-xs text-[#3B2415] font-medium truncate mt-0.5">{scripture.lastReadLabel}</p>
          </div>
          <Link
            href={scripture.href}
            className="ml-2 w-9 h-9 bg-[#C17D3C] hover:bg-[#9B6020] active:scale-95 rounded-full flex items-center justify-center text-white transition-all shadow-md shadow-amber-900/20 shrink-0"
          >
            <Play size={13} fill="white" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
