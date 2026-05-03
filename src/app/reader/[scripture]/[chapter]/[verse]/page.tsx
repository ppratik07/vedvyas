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

const NON_GITA_SCRIPTURES = new Set(["ramayana", "mahabharata", "rig-veda", "upanishads", "arthashastra", "bhagavata-purana", "atharva-veda"]);

// Static fallback per scripture when AI is unavailable
const STATIC_FALLBACKS: Record<string, GitaVerse> = {
  "rig-veda": {
    _id: "rv-fallback", chapter: 1, verse: 1,
    slok: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्।",
    transliteration: "agnim īḷe purohitaṃ yajñasya devam ṛtvijam",
    prabhu: { author: "Scholarly Translation", et: "I praise Agni, the household priest, the divine minister of the sacrifice.", ec: "The opening hymn of the Rigveda invokes Agni, the sacred fire that mediates between humans and the divine." },
    sankar: { author: "Classical Commentary", et: "We worship Agni, the divine priest of the sacrifice.", ec: "Agni represents the transformative power of consciousness that carries offerings to the celestial realm." },
  },
  "ramayana": {
    _id: "rm-fallback", chapter: 1, verse: 1,
    slok: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।",
    transliteration: "rāmo vigrahavänn dharmaḥ sādhuḥ satya-parākramaḥ",
    prabhu: { author: "Scholarly Translation", et: "Rama is the embodiment of righteousness, virtuous and of true valor.", ec: "This verse encapsulates the central theme of the Ramayana — Rama as the ideal human being and upholder of Dharma." },
    sankar: { author: "Classical Commentary", et: "Rama embodies Dharma in human form.", ec: "The Ramayana presents Rama as both a historical king and a manifestation of ideal virtue." },
  },
  "mahabharata": {
    _id: "mb-fallback", chapter: 1, verse: 1,
    slok: "धर्मो रक्षति रक्षितः।",
    transliteration: "dharmo rakṣati rakṣitaḥ",
    prabhu: { author: "Scholarly Translation", et: "Dharma protects those who protect it.", ec: "This maxim from the Mahabharata captures the reciprocal relationship between a person and righteousness." },
    sankar: { author: "Classical Commentary", et: "The law of righteousness shelters one who upholds it.", ec: "The Mahabharata teaches that living in accordance with dharma is itself a form of divine protection." },
  },
  "upanishads": {
    _id: "up-fallback", chapter: 1, verse: 1,
    slok: "तत्त्वमसि।",
    transliteration: "tat tvam asi",
    prabhu: { author: "Scholarly Translation", et: "That thou art — the great mahavakya declaring the identity of the individual soul with Brahman.", ec: "One of the four great sayings of the Upanishads, from the Chandogya Upanishad." },
    sankar: { author: "Classical Commentary", et: "Thou art the Absolute Reality.", ec: "Adi Shankara's Advaita Vedanta holds this mahavakya as the highest expression of non-dual truth." },
  },
  "arthashastra": {
    _id: "as-fallback", chapter: 1, verse: 1,
    slok: "सुखस्य मूलं धर्मः। धर्मस्य मूलं अर्थः। अर्थस्य मूलं राज्यम्।",
    transliteration: "sukhasya mūlaṃ dharmaḥ | dharmasya mūlaṃ arthaḥ | arthasya mūlaṃ rājyam",
    prabhu: { author: "Scholarly Translation", et: "The root of happiness is dharma; the root of dharma is wealth (artha); the root of wealth is the state.", ec: "Kautilya establishes the interdependence of the four aims of life, placing statecraft at the foundation of all human flourishing." },
    sankar: { author: "Classical Commentary", et: "Welfare springs from righteousness, righteousness from prosperity, and prosperity from sound governance.", ec: "The Arthashastra is unique among ancient texts in treating worldly governance as a prerequisite for dharmic life." },
  },
  "bhagavata-purana": {
    _id: "bp-fallback", chapter: 1, verse: 1,
    slok: "जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्।",
    transliteration: "janmādyasya yato'nvayāditarataścārtheṣvabhijñaḥ svarāṭ",
    prabhu: { author: "Scholarly Translation", et: "He from whom the creation, sustenance, and dissolution of the universe proceed — who is directly and indirectly conscious of all — that Absolute Truth is Brahman.", ec: "The opening sutra of the Bhagavata Purana establishes the Supreme as the source and substance of all existence." },
    sankar: { author: "Classical Commentary", et: "That from which all beings arise, in which they live, and into which they return — know that as Brahman.", ec: "This echoes the Taittiriya Upanishad, grounding the Bhagavata's devotional theology in Vedantic non-dualism." },
  },
  "atharva-veda": {
    _id: "av-fallback", chapter: 1, verse: 1,
    slok: "भद्रं कर्णेभिः शृणुयाम देवाः। भद्रं पश्येमाक्षभिर्यजत्राः।",
    transliteration: "bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ | bhadraṃ paśyemākṣabhir yajatrāḥ",
    prabhu: { author: "Scholarly Translation", et: "O gods, may we hear with our ears what is auspicious; may we see with our eyes what is auspicious, O ye worthy of worship.", ec: "This shanti-patha (peace invocation) opens the Atharva Veda, praying for well-being of the senses and the entire being." },
    sankar: { author: "Classical Commentary", et: "May blessed things enter through our ears; may our eyes behold the holy and the good.", ec: "The Vedic tradition regards sound and sight as the primary channels of divine grace, which this prayer seeks to purify." },
  },
};

async function fetchNonGitaVerse(scripture: string, chapter: number, verse: number): Promise<GitaVerse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/verse/${scripture}/${chapter}/${verse}`,
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data = await res.json() as GitaVerse;
      if (data.slok) return { ...data, chapter, verse };
    }
  } catch {
    // fall through to static fallback
  }
  const fallback = STATIC_FALLBACKS[scripture] ?? STATIC_FALLBACKS["rig-veda"];
  return { ...fallback, _id: `${scripture}-${chapter}-${verse}`, chapter, verse };
}

export default async function ReaderPage({ params }: Params) {
  const { scripture, chapter, verse } = await params;
  const ch = parseInt(chapter, 10);
  const v = parseInt(verse, 10);

  if (isNaN(ch) || isNaN(v) || ch < 1 || v < 1) notFound();

  let verseData: GitaVerse;
  if (scripture === "bhagavad-gita") {
    verseData = (await fetchGitaVerse(ch, v)) ?? FALLBACK_VERSE;
  } else if (NON_GITA_SCRIPTURES.has(scripture)) {
    verseData = await fetchNonGitaVerse(scripture, ch, v);
  } else {
    notFound();
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
