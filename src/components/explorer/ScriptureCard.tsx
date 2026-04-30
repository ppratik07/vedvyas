import type { Scripture } from "@/lib/types";
import Link from "next/link";
import { Play } from "lucide-react";

interface ScriptureCardProps {
  scripture: Scripture;
}

export default function ScriptureCard({ scripture }: ScriptureCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(59,36,21,0.08)] hover:shadow-[0_8px_32px_rgba(59,36,21,0.15)] transition-shadow flex flex-col">
      {/* Cover */}
      <div className={`relative h-36 bg-gradient-to-br ${scripture.coverGradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3), transparent 60%)"
        }} />
        <span className="text-6xl opacity-60 select-none">{scripture.coverEmoji}</span>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-display font-bold text-lg leading-tight drop-shadow">
            {scripture.title}
          </h3>
          <p className="text-white/70 text-xs">{scripture.subtitle}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs text-[#8B6344] mb-1">
            <span>Completion</span>
            <span>{scripture.completionPercent}%</span>
          </div>
          <div className="h-1.5 bg-[#F5E6D0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C17D3C] rounded-full"
              style={{ width: `${scripture.completionPercent}%` }}
            />
          </div>
        </div>

        {/* Last read + play button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#B8906A]">Last Read</p>
            <p className="text-xs text-[#3B2415] font-medium">{scripture.lastReadLabel}</p>
          </div>
          <Link
            href={scripture.href}
            className="w-8 h-8 bg-[#C17D3C] hover:bg-[#9B6020] rounded-full flex items-center justify-center text-white transition-colors"
          >
            <Play size={12} fill="white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
