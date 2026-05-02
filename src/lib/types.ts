// ──────────────────────────────────────────
// Scripture & Verse types
// ──────────────────────────────────────────

export interface CommentaryEntry {
  author: string;
  et?: string;  // english translation
  ht?: string;  // hindi translation
  ec?: string;  // english commentary
  hc?: string;  // hindi commentary
  sc?: string;  // sanskrit commentary
}

export interface GitaVerse {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  tej?: CommentaryEntry;
  siva?: CommentaryEntry;
  purohit?: CommentaryEntry;
  chinmay?: CommentaryEntry;
  san?: CommentaryEntry;
  adi?: CommentaryEntry;
  gambir?: CommentaryEntry;
  madhav?: CommentaryEntry;
  anand?: CommentaryEntry;
  rams?: CommentaryEntry;
  raman?: CommentaryEntry;
  abhinav?: CommentaryEntry;
  sankar?: CommentaryEntry;
  vallabh?: CommentaryEntry;
  ms?: CommentaryEntry;
  srid?: CommentaryEntry;
  dhan?: CommentaryEntry;
  venkat?: CommentaryEntry;
  puru?: CommentaryEntry;
  neel?: CommentaryEntry;
  prabhu?: CommentaryEntry;
  jaya?: CommentaryEntry;
}

export interface Scripture {
  id: string;
  title: string;
  subtitle: string;   // e.g. "18 Chapters" or "7 Kandas"
  description: string;
  coverGradient: string;  // Tailwind gradient classes
  coverEmoji: string;
  chaptersCount: number;
  chapterLabel: string; // "Chapter" | "Kanda" | "Parva" | "Mandala" | "Text"
  completionPercent: number;
  lastReadLabel: string;
  lastReadRef: string;
  href: string;
}

// ──────────────────────────────────────────
// User progress types
// ──────────────────────────────────────────

export interface Bookmark {
  id: string;
  title: string;
  reference: string; // e.g. "Rigveda 10.129"
  preview: string;
  tags: string[];
  savedAt: string;   // ISO date
}

export interface JournalEntry {
  id: string;
  reference: string; // e.g. "YAJURVEDA 2.15"
  quote: string;
  note: string;
  createdAt: string;  // ISO date
}

export interface UserProgress {
  _v?: number;             // schema version — absent on old demo-seeded data
  versesRead: number;
  streakDays: number;
  lastReadDate: string | null;
  streakHistory: string[]; // ISO dates of last 7 days read
  milestones: number;
  bookmarks: Bookmark[];
  journal: JournalEntry[];
  scriptureProgress: Record<string, number>; // scriptureId -> % complete
  currentReadingPath: string; // scripture id being focused
  readingPathIndex: number;   // 0-4
}

// ──────────────────────────────────────────
// Search / AI types
// ──────────────────────────────────────────

export interface Citation {
  id: string;    // e.g. "BG 2.47"
  verse: string; // snippet of Sanskrit
  context: string; // "Read in Context" label
  href: string;
}

export interface SearchResult {
  synthesis: string;
  citations: Citation[];
  relatedConcepts: string[];
  visualStudyTitle: string;
}
