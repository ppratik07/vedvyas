"use client";

import { useProgress } from "@/hooks/useProgress";
import { Flame } from "lucide-react";

export default function StudyStreak() {
  const { progress } = useProgress();
  const streakDays = progress?.streakDays ?? 14;
  const history = progress?.streakHistory ?? [];

  // Last 7 days labels
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="bg-[#F5E6D0] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8B6344] font-medium">Study Streak</p>
          <p className="font-display text-3xl font-bold text-[#3B2415]">{streakDays}</p>
          <p className="text-xs text-[#8B6344]">Days</p>
        </div>
        <Flame size={28} className="text-[#C17D3C]" />
      </div>

      {/* Day indicators */}
      <div className="flex gap-1.5 justify-between">
        {days.map((d, i) => {
          const active = history.includes(d);
          const isToday = i === 6;
          return (
            <div
              key={d}
              className={`flex-1 h-7 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                active
                  ? isToday
                    ? "bg-[#C17D3C] text-white"
                    : "bg-[#C17D3C]/60 text-white"
                  : "bg-white/60 text-[#B8906A]"
              }`}
              title={d}
            >
              {["S","M","T","W","T","F","S"][new Date(d + "T12:00:00").getDay()]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
