"use client";

import { useProgress } from "@/hooks/useProgress";
import { BookOpen, Flame, Trophy } from "lucide-react";

export default function StatsOverview() {
  const { progress } = useProgress();
  if (!progress) return null;

  const stats = [
    {
      icon: <BookOpen size={22} className="text-[#C17D3C]" />,
      value: progress.versesRead.toLocaleString(),
      label: "Total Verses Read",
      delta: "+12 today",
    },
    {
      icon: <Flame size={22} className="text-[#C17D3C]" />,
      value: `${progress.streakDays} Days`,
      label: "Current Streak",
      delta: `Highest: 32`,
    },
    {
      icon: <Trophy size={22} className="text-[#C17D3C]" />,
      value: `${progress.milestones} Achieved`,
      label: "Milestones",
      delta: "4/12 Active",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-[#E8D5B8] p-5 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-[#FDF6EC] rounded-full flex items-center justify-center">
              {s.icon}
            </div>
            <span className="text-xs text-[#B8906A] font-medium">{s.delta}</span>
          </div>
          <p className="font-display text-2xl font-bold text-[#3B2415]">{s.value}</p>
          <p className="text-xs text-[#8B6344]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
