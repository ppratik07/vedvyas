import type { GitaVerse } from "@/lib/types";
import { GITA_VERSE_COUNTS } from "@/lib/data/scriptures";

const BASE_URL = "https://vedicscriptures.github.io/slok";

export async function fetchGitaVerse(chapter: number, verse: number): Promise<GitaVerse | null> {
  try {
    const res = await fetch(`${BASE_URL}/${chapter}/${verse}`, {
      next: { revalidate: 86400 }, // cache 24 hours
    });
    if (!res.ok) return null;
    const data: GitaVerse = await res.json();
    return data;
  } catch {
    return null;
  }
}

export function getGitaVerseCount(chapter: number): number {
  return GITA_VERSE_COUNTS[chapter] ?? 0;
}

export function getTotalGitaVerses(): number {
  return GITA_VERSE_COUNTS.reduce((a, b) => a + b, 0);
}

// Returns { chapter, verse } for today's daily verse (deterministic by date)
export function getDailyVerseRef(): { chapter: number; verse: number } {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  // 700 total Gita verses; map day of year to a verse
  const total = getTotalGitaVerses(); // 700
  const idx = dayOfYear % total;

  let cumulative = 0;
  for (let ch = 1; ch <= 18; ch++) {
    const count = GITA_VERSE_COUNTS[ch];
    if (idx < cumulative + count) {
      return { chapter: ch, verse: idx - cumulative + 1 };
    }
    cumulative += count;
  }
  return { chapter: 2, verse: 47 };
}

// Fallback verse used when API is unavailable
export const FALLBACK_VERSE: GitaVerse = {
  _id: "BG2.47",
  chapter: 2,
  verse: 47,
  slok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
  transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi ||",
  prabhu: {
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    et: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    ec: "This verse forms the cornerstone of Nishkama Karma in the Bhagavad Gita's ethical framework.",
  },
  sankar: {
    author: "Sri Shankaracharya",
    et: "Your right is for action alone, never for the results. Do not become the agent of the results of action. May you not have any inclination for inaction.",
    ec: "Adi Shankara explains that the 'right' (adhikara) mentioned here refers to the eligibility of a seeker to perform Karma-yoga. The focus is on the purification of the mind through desireless action.",
  },
};
