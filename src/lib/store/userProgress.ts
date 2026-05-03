"use client";

import type { UserProgress, Bookmark, JournalEntry } from "@/lib/types";
import { getAuthUser } from "@/lib/store/auth";

const STORAGE_KEY = "vedvyas_progress";

export const FRESH_PROGRESS: UserProgress = {
  _v: 1,
  versesRead: 0,
  streakDays: 0,
  lastReadDate: "",
  streakHistory: [],
  milestones: 0,
  bookmarks: [],
  journal: [],
  scriptureProgress: {},
  currentReadingPath: "bhagavad-gita",
  readingPathIndex: 0,
};

export function resetProgress(): void {
  saveProgress(FRESH_PROGRESS);
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return FRESH_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgressLocal(FRESH_PROGRESS);
      return { ...FRESH_PROGRESS };
    }
    const parsed = JSON.parse(raw) as UserProgress;
    if (!parsed._v) {
      // Old demo-seeded data — wipe it
      saveProgressLocal(FRESH_PROGRESS);
      return { ...FRESH_PROGRESS };
    }
    return parsed;
  } catch {
    return FRESH_PROGRESS;
  }
}

/** Write to localStorage only (no DB sync). Use internally to avoid loops. */
function saveProgressLocal(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/** Write to localStorage and async-sync to DB if user is logged in. */
export function saveProgress(progress: UserProgress): void {
  saveProgressLocal(progress);
  const auth = getAuthUser();
  if (auth?.accountId) {
    fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId: auth.accountId, progress }),
    }).catch(() => {/* best-effort */});
  }
}

/**
 * Load progress from DB into localStorage.
 * Called on login so the user sees their real data immediately.
 */
export async function loadProgressFromDb(accountId: string): Promise<void> {
  try {
    const res = await fetch(`/api/progress?accountId=${encodeURIComponent(accountId)}`);
    if (!res.ok) return;
    const data = await res.json() as { progress?: UserProgress };
    if (data.progress) {
      saveProgressLocal({ ...data.progress, _v: 1 });
    }
  } catch {
    // Network error — fall back to localStorage
  }
}

export function markVerseRead(scriptureId: string): void {
  const p = getProgress();
  const today = new Date().toISOString().split("T")[0];

  p.versesRead += 1;

  if (p.lastReadDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];
    if (p.lastReadDate === yStr) {
      p.streakDays += 1;
    } else {
      p.streakDays = 1;
    }
    p.lastReadDate = today;
    if (!p.streakHistory.includes(today)) {
      p.streakHistory = [...p.streakHistory.slice(-6), today];
    }
  }

  saveProgress(p);
}

export function addBookmark(bookmark: Omit<Bookmark, "id" | "savedAt">): void {
  const p = getProgress();
  p.bookmarks.unshift({
    ...bookmark,
    id: `bm${Date.now()}`,
    savedAt: new Date().toISOString(),
  });
  saveProgress(p);
}

export function addJournalEntry(entry: Omit<JournalEntry, "id" | "createdAt">): void {
  const p = getProgress();
  p.journal.unshift({
    ...entry,
    id: `j${Date.now()}`,
    createdAt: new Date().toISOString(),
  });
  saveProgress(p);
}
