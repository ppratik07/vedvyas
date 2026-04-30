"use client";

import { useState, useEffect } from "react";
import type { UserProgress } from "@/lib/types";
import { getProgress, saveProgress } from "@/lib/store/userProgress";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const update = (updated: UserProgress) => {
    saveProgress(updated);
    setProgress(updated);
  };

  return { progress, update };
}
