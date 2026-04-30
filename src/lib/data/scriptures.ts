import type { Scripture } from "@/lib/types";

export const SCRIPTURES: Scripture[] = [
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gita",
    subtitle: "18 Chapters",
    description: "The song of the Lord — Krishna's discourse to Arjuna on the battlefield of Kurukshetra.",
    coverGradient: "from-amber-900 via-amber-700 to-amber-500",
    coverEmoji: "🪷",
    chaptersCount: 18,
    chapterLabel: "Chapter",
    completionPercent: 45,
    lastReadLabel: "Ch 8: The Eternal God",
    lastReadRef: "/reader/bhagavad-gita/8/1",
    href: "/reader/bhagavad-gita/1/1",
  },
  {
    id: "ramayana",
    title: "Ramayan",
    subtitle: "7 Kandas",
    description: "Valmiki's epic — the journey of Rama, the ideal man, and his divine mission.",
    coverGradient: "from-blue-900 via-blue-700 to-blue-500",
    coverEmoji: "🏹",
    chaptersCount: 7,
    chapterLabel: "Kanda",
    completionPercent: 12,
    lastReadLabel: "Bala Kanda: Verse 42",
    lastReadRef: "/reader/ramayana/1/42",
    href: "/reader/ramayana/1/1",
  },
  {
    id: "mahabharata",
    title: "Mahabharat",
    subtitle: "18 Parvas",
    description: "The world's longest epic — the great war of Dharma between the Pandavas and Kauravas.",
    coverGradient: "from-orange-900 via-orange-700 to-orange-500",
    coverEmoji: "⚔️",
    chaptersCount: 18,
    chapterLabel: "Parva",
    completionPercent: 62,
    lastReadLabel: "Shanti Parva",
    lastReadRef: "/reader/mahabharata/12/1",
    href: "/reader/mahabharata/1/1",
  },
  {
    id: "rig-veda",
    title: "Rig Veda",
    subtitle: "10 Mandalas",
    description: "The oldest of the Vedas — hymns of praise to the gods of the natural world.",
    coverGradient: "from-yellow-900 via-yellow-700 to-yellow-500",
    coverEmoji: "🔥",
    chaptersCount: 10,
    chapterLabel: "Mandala",
    completionPercent: 5,
    lastReadLabel: "Mandala 1: Agni Sukta",
    lastReadRef: "/reader/rig-veda/1/1",
    href: "/reader/rig-veda/1/1",
  },
  {
    id: "upanishads",
    title: "Upanishads",
    subtitle: "Major texts",
    description: "The philosophical heart of Vedanta — exploring Brahman, Atman, and ultimate reality.",
    coverGradient: "from-rose-900 via-rose-700 to-rose-500",
    coverEmoji: "🕉️",
    chaptersCount: 12,
    chapterLabel: "Text",
    completionPercent: 28,
    lastReadLabel: "Katha Upanishad",
    lastReadRef: "/reader/upanishads/2/1",
    href: "/reader/upanishads/1/1",
  },
];

// Chapter verse counts for Bhagavad Gita (1-indexed, index 0 = dummy)
export const GITA_VERSE_COUNTS: number[] = [
  0, 47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78,
];

export const WEEKLY_WISDOM = [
  "Truth can never be found by one who is devoid of courage.",
  "The soul is never born nor dies at any time.",
  "One who is not disturbed in mind even amidst the threefold miseries can achieve lasting happiness.",
  "The mind is restless and difficult to restrain, but it is subdued by practice.",
  "Let right deeds be thy motive, not the fruit which comes from them.",
];

export const READING_PATH = [
  { id: "rig-veda", label: "Rigveda", status: "completed" as const },
  { id: "samaveda", label: "Samaveda", status: "completed" as const },
  { id: "yajurveda", label: "Yajurveda", status: "in-progress" as const, progress: 64 },
  { id: "atharvaveda", label: "Atharvaveda", status: "locked" as const },
  { id: "upanishads", label: "Upanishads", status: "locked" as const },
];
