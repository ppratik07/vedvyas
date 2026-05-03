"use client";

import { useProgress } from "@/hooks/useProgress";
import { READING_PATH } from "@/lib/data/scriptures";
import { Check, Lock } from "lucide-react";

export default function ReadingPath() {
  const { progress } = useProgress();

  // Compute statuses from real progress data
  const steps = READING_PATH.map((step) => {
    const pct = progress?.scriptureProgress[step.id] ?? 0;
    if (pct >= 100) return { ...step, status: "completed" as const, progress: 100 };
    if (pct > 0) return { ...step, status: "in-progress" as const, progress: pct };
    return { ...step, status: "locked" as const, progress: 0 };
  });

  const firstIncompleteIdx = steps.findIndex((s) => s.status !== "completed");
  const completedCount = firstIncompleteIdx === -1 ? steps.length : firstIncompleteIdx;
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B8] p-5 shadow-sm">
      <h3 className="font-semibold text-[#3B2415] text-sm mb-1">Reading Path: The Journey</h3>
      <div className="flex items-center justify-between mt-5 relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#E8D5B8]" />
        <div
          className="absolute top-5 left-8 h-0.5 bg-[#C17D3C]"
          style={{
            width: `calc(${(completedCount / (steps.length - 1)) * 100}% - 2rem)`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in-progress";
          const isLocked = step.status === "locked";

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-[#C17D3C] text-white"
                    : isInProgress
                    ? "bg-white border-2 border-[#C17D3C] text-[#C17D3C]"
                    : "bg-[#F5E6D0] text-[#B8906A]"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : isLocked ? (
                  <Lock size={14} />
                ) : (
                  <span className="text-xs font-bold">📖</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-[#3B2415] leading-tight">{step.label}</p>
                <p className={`text-[10px] uppercase tracking-wider font-medium ${
                  isCompleted ? "text-[#C17D3C]" :
                  isInProgress ? "text-[#C17D3C]" : "text-[#B8906A]"
                }`}>
                  {isCompleted ? "Completed" :
                   isInProgress ? `${"progress" in step ? step.progress : 0}% Progress` : "Locked"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
