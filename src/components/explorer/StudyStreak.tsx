"use client";

import { useProgress } from "@/hooks/useProgress";
import { Flame, TrendingUp } from "lucide-react";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function StudyStreak() {
  const { progress } = useProgress();
  const streakDays = progress?.streakDays ?? 14;
  const history = progress?.streakHistory ?? [];

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F5E6D0 0%, #EDD5B0 100%)" }}
    >
      {/* Decorative flame watermark */}
      <div className="absolute right-3 bottom-0 text-[80px] leading-none opacity-10 select-none pointer-events-none">
        🔥
      </div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#8B6344] font-semibold">Study Streak</p>
          <div className="flex items-end gap-1.5 mt-1">
            <span className="font-display text-4xl font-bold text-[#3B2415] leading-none">{streakDays}</span>
            <span className="text-sm text-[#8B6344] font-medium mb-0.5">days</span>
          </div>
        </div>
        <div className="w-10 h-10 bg-[#C17D3C] rounded-xl flex items-center justify-center shadow-md shadow-amber-900/20">
          <Flame size={20} className="text-white" />
        </div>
      </div>

      {/* Day pills */}
      <div className="flex gap-1.5 relative z-10">
        {days.map((d, i) => {
          const active = history.includes(d);
          const isToday = i === 6;
          const label = DAY_LABELS[new Date(d + "T12:00:00").getDay()];
          return (
            <div
              key={d}
              title={d}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg transition-all ${
                active
                  ? isToday
                    ? "bg-[#C17D3C] shadow-sm shadow-amber-900/25"
                    : "bg-[#C17D3C]/65"
                  : "bg-white/50"
              }`}
            >
              <span className={`text-[10px] font-bold ${active ? "text-white" : "text-[#B8906A]"}`}>{label}</span>
              {active && (
                <div className={`w-1 h-1 rounded-full ${isToday ? "bg-white" : "bg-white/80"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 relative z-10">
        <TrendingUp size={12} className="text-[#C17D3C]" />
        <p className="text-[11px] text-[#8B6344] font-medium">Personal best: 32 days</p>
      </div>
    </div>
  );
}
