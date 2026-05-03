"use client";

import { useProgress } from "@/hooks/useProgress";
import { BookOpen, Flame, Trophy } from "lucide-react";

export default function StatsOverview() {
  const { progress } = useProgress();
  if (!progress) return null;

  const stats = [
    {
      icon: <BookOpen size={20} className="text-white" />,
      iconBg: "bg-[#C17D3C]",
      value: progress.versesRead.toLocaleString(),
      label: "Total Verses Read",
      delta: progress.versesRead > 0 ? `${progress.versesRead} total` : "Just getting started",
      positive: progress.versesRead > 0,
    },
    {
      icon: <Flame size={20} className="text-white" />,
      iconBg: "bg-[#A86830]",
      value: `${progress.streakDays}`,
      unit: "days",
      label: "Current Streak",
      delta: progress.streakDays > 0 ? `${progress.streakDays}-day streak` : "Start your streak today",
      positive: progress.streakDays > 0,
    },
    {
      icon: <Trophy size={20} className="text-white" />,
      iconBg: "bg-[#8B5E24]",
      value: `${progress.milestones}`,
      unit: "achieved",
      label: "Milestones",
      delta: progress.milestones > 0 ? `${progress.milestones} unlocked` : "None yet",
      positive: progress.milestones > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl border border-[#E8D5B8] p-5 shadow-sm hover:shadow-md hover:border-[#D4B896] transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
              {s.icon}
            </div>
            <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${
              s.positive ? "bg-emerald-50 text-emerald-600" : "bg-[#FDF6EC] text-[#8B6344]"
            }`}>
              {s.delta}
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            <p className="font-display text-3xl font-bold text-[#3B2415] leading-none">{s.value}</p>
            {s.unit && <p className="text-sm text-[#8B6344] mb-0.5">{s.unit}</p>}
          </div>
          <p className="text-xs text-[#8B6344] mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
