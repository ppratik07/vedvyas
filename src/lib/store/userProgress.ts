"use client";

import type { UserProgress, Bookmark, JournalEntry } from "@/lib/types";

const STORAGE_KEY = "vedvyas_progress";

const DEFAULT_PROGRESS: UserProgress = {
  versesRead: 1402,
  streakDays: 14,
  lastReadDate: new Date().toISOString().split("T")[0],
  streakHistory: Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  }),
  milestones: 8,
  bookmarks: [
    {
      id: "bm1",
      title: "The Hymn of Creation (Nasadiya Sukta)",
      reference: "Rigveda 10.129",
      preview: "\"Then was not non-existent nor existent...\"",
      tags: ["COSMOLOGY", "PHILOSOPHY"],
      savedAt: new Date().toISOString(),
    },
    {
      id: "bm2",
      title: "The Prayer for Peace",
      reference: "Sama Veda",
      preview: "\"May there be peace in the sky...\"",
      tags: ["DAILY PRAYER"],
      savedAt: new Date().toISOString(),
    },
    {
      id: "bm3",
      title: "On Right Action",
      reference: "Samaveda 3.11",
      preview: "\"O Agni, lead us on the path of prosperity...\"",
      tags: ["DHARMA"],
      savedAt: new Date().toISOString(),
    },
  ],
  journal: [
    {
      id: "j1",
      reference: "YAJURVEDA 2.15",
      quote: "\"The nature of truth is like a golden vessel, covering the entrance to the Absolute.\"",
      note: "This metaphor of the 'golden vessel' seems to imply that even beauty can be a distraction from ultimate reality.",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: "j2",
      reference: "RIGVEDA 1.164",
      quote: "\"They call him Indra, Mitra, Varuna, Agni, and he is heavenly nobly-winged Garutman.\"",
      note: "Reflection on the oneness of divinity despite the many names used in the hymns.",
      createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    },
  ],
  scriptureProgress: {
    "bhagavad-gita": 45,
    "ramayana": 12,
    "mahabharata": 62,
    "rig-veda": 5,
    "upanishads": 28,
  },
  currentReadingPath: "yajurveda",
  readingPathIndex: 2,
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }
    return JSON.parse(raw) as UserProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markVerseRead(scriptureId: string): void {
  const p = getProgress();
  const today = new Date().toISOString().split("T")[0];

  p.versesRead += 1;

  // Update streak
  if (p.lastReadDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];
    if (p.lastReadDate === yStr) {
      p.streakDays += 1;
    } else if (p.lastReadDate !== today) {
      p.streakDays = 1;
    }
    p.lastReadDate = today;

    // Keep last 7 days history
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
