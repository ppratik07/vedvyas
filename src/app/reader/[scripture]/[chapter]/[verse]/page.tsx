import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ReaderClient from "./ReaderClient";
import { fetchGitaVerse, FALLBACK_VERSE } from "@/lib/api/gita";
import type { GitaVerse } from "@/lib/types";
import { notFound } from "next/navigation";
import { SCRIPTURES } from "@/lib/data/scriptures";

interface Params {
  params: Promise<{
    scripture: string;
    chapter: string;
    verse: string;
  }>;
}

// Mock verse for non-Gita scriptures
function getMockVerse(scripture: string, chapter: number, verse: number): GitaVerse {
  const mockTexts: Record<string, { slok: string; transliteration: string; english: string }> = {
    "ramayana": {
      slok: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।",
      transliteration: "rāmo vigrahavänn dharmaḥ sādhuḥ satya-parākramaḥ",
      english: "Rama is the embodiment of righteousness, virtuous and of true valor.",
    },
    "mahabharata": {
      slok: "धर्मो रक्षति रक्षितः।",
      transliteration: "dharmo rakṣati rakṣitaḥ",
      english: "Dharma protects those who protect it.",
    },
    "rig-veda": {
      slok: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्।",
      transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam",
      english: "I praise Agni, the household priest, the divine minister of the sacrifice.",
    },
    "upanishads": {
      slok: "तत्त्वमसि।",
      transliteration: "tat tvam asi",
      english: "That thou art. — The great mahavakya declaring the identity of the individual soul with Brahman.",
    },
  };

  const t = mockTexts[scripture] ?? mockTexts["ramayana"];
  return {
    _id: `${scripture}-${chapter}-${verse}`,
    chapter,
    verse,
    slok: t.slok,
    transliteration: t.transliteration,
    prabhu: {
      author: "Scholarly Translation",
      et: t.english,
      ec: "This verse captures a fundamental teaching of the scripture.",
    },
    sankar: {
      author: "Classical Commentary",
      et: t.english,
      ec: "The ancient commentators held this teaching as central to understanding the text.",
    },
  };
}

export default async function ReaderPage({ params }: Params) {
  const { scripture, chapter, verse } = await params;
  const ch = parseInt(chapter, 10);
  const v = parseInt(verse, 10);

  if (isNaN(ch) || isNaN(v) || ch < 1 || v < 1) notFound();

  let verseData: GitaVerse;
  if (scripture === "bhagavad-gita") {
    verseData = (await fetchGitaVerse(ch, v)) ?? FALLBACK_VERSE;
  } else {
    verseData = getMockVerse(scripture, ch, v);
  }

  const scriptureData = SCRIPTURES.find((s) => s.id === scripture);
  const scriptureTitle = scriptureData?.title ?? scripture;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar title={scriptureTitle} subtitle="Sacred Text" />
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <ReaderClient
            verse={verseData}
            scripture={scripture}
            chapter={ch}
            verseNum={v}
          />
        </div>
      </div>
    </div>
  );
}
