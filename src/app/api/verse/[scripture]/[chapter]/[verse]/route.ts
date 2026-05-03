import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import type { GitaVerse } from "@/lib/types";

const SCRIPTURE_NAMES: Record<string, string> = {
  "ramayana": "Valmiki Ramayana",
  "mahabharata": "Mahabharata",
  "rig-veda": "Rigveda",
  "upanishads": "Principal Upanishads",
};

// Map chapter numbers to specific parvas/sections so the AI generates
// contextually accurate content rather than defaulting to Gita verses.
const MAHABHARATA_PARVAS: Record<number, string> = {
  1: "Adi Parva (Book of Beginnings) — creation of the universe, birth of the Kuru lineage",
  2: "Sabha Parva (Book of the Assembly Hall) — the dice game and Draupadi's humiliation",
  3: "Vana Parva (Book of the Forest) — the Pandavas' twelve-year exile in the forest",
  4: "Virata Parva (Book of Virata) — the Pandavas' disguised stay in King Virata's court",
  5: "Udyoga Parva (Book of Effort) — peace negotiations before the Kurukshetra war",
  6: "Bhishma Parva — the first ten days of the Kurukshetra battle under Bhishma's command",
  7: "Drona Parva — fifteen days of battle led by Drona as commander",
  8: "Karna Parva — two days of battle under Karna's command",
  9: "Shalya Parva — the final day of battle and Duryodhana's last stand",
  10: "Sauptika Parva — the night raid by Ashvatthama",
  11: "Stri Parva — the women's lament after the war",
  12: "Shanti Parva — Yudhishthira's grief and Bhishma's teachings on kingship and dharma",
  13: "Anushasana Parva — Bhishma's further teachings on duty and righteousness",
  14: "Ashvamedha Parva — the horse sacrifice performed by Yudhishthira",
  15: "Ashramavasika Parva — Dhritarashtra and Gandhari retire to the forest",
  16: "Mausala Parva — the destruction of the Yadava clan",
  17: "Mahaprasthanika Parva — the Pandavas' great journey to the Himalayas",
  18: "Svargarohana Parva — the Pandavas' ascent to heaven",
};

const RAMAYANA_KANDAS: Record<number, string> = {
  1: "Bala Kanda — Rama's birth, childhood, and breaking of Shiva's bow",
  2: "Ayodhya Kanda — Rama's exile and Dasharatha's death",
  3: "Aranya Kanda — forest exile, Surpanakha's encounter, and Sita's abduction",
  4: "Kishkindha Kanda — alliance with Sugriva and Hanuman",
  5: "Sundara Kanda — Hanuman's journey to Lanka and finding Sita",
  6: "Yuddha Kanda — the war in Lanka and Rama's victory",
  7: "Uttara Kanda — Rama's reign, Sita's trial, and the river's embrace",
};

const UPANISHAD_TEXTS: Record<number, string> = {
  1: "Isha Upanishad — the isavasyam opening verse on the divine permeating all",
  2: "Kena Upanishad — 'by whom is the mind directed?' — the question of the ultimate subject",
  3: "Katha Upanishad — Nachiketa's encounter with Yama and the secret of immortality",
  4: "Prashna Upanishad — six questions about life force, creation, and liberation",
  5: "Mundaka Upanishad — the two birds parable and the higher versus lower knowledge",
  6: "Mandukya Upanishad — the four states of consciousness and AUM",
  7: "Taittiriya Upanishad — the five sheaths of existence (pancha-kosha)",
  8: "Aitareya Upanishad — the cosmic consciousness and self-knowledge",
  9: "Chandogya Upanishad — the Tat Tvam Asi mahavakya and the nature of Brahman",
  10: "Brihadaranyaka Upanishad — Yajnavalkya's dialogues on the Atman",
};

function buildPrompt(scripture: string, chapter: number, verse: number): string {
  let contextClue = "";

  if (scripture === "mahabharata") {
    const maxParva = Math.max(...Object.keys(MAHABHARATA_PARVAS).map(Number));
    const parvaNum = ((chapter - 1) % maxParva) + 1;
    const parvaDesc = MAHABHARATA_PARVAS[parvaNum] ?? MAHABHARATA_PARVAS[1];
    contextClue = `This verse comes from the ${parvaDesc}.
IMPORTANT: Do NOT generate content from the Bhagavad Gita. The Bhagavad Gita is a separate text. Generate narrative prose-poetry from the specific Mahabharata parva described above, dealing with its characters and events (e.g. Yudhishthira, Bhishma, Draupadi, Duryodhana, Karna, Arjuna outside of the Gita context).`;
  } else if (scripture === "ramayana") {
    const maxKanda = Math.max(...Object.keys(RAMAYANA_KANDAS).map(Number));
    const kandaNum = ((chapter - 1) % maxKanda) + 1;
    const kandaDesc = RAMAYANA_KANDAS[kandaNum] ?? RAMAYANA_KANDAS[1];
    contextClue = `This verse comes from the ${kandaDesc}.
Generate a verse fitting the narrative context of that Kanda — Rama, Sita, Lakshmana, Hanuman, Ravana, or other characters relevant to that section.`;
  } else if (scripture === "rig-veda") {
    const mandala = ((chapter - 1) % 10) + 1;
    contextClue = `This is from Mandala ${mandala} of the Rigveda, Sukta (hymn) ${verse}.
Generate a Vedic hymn addressed to a deity appropriate for Mandala ${mandala}: Mandala 1→Agni/Indra, 2→Indra/Gritsamada, 3→Vishvamitra/Indra, 4→Indra, 5→Mitra/Varuna, 6→Indra/Agni, 7→Varuna/Indra, 8→Indra/Soma, 9→Soma/Pavamana, 10→Purusha/Nasadiya. Include the deity's name in the verse.`;
  } else if (scripture === "upanishads") {
    const maxUpanishad = Math.max(...Object.keys(UPANISHAD_TEXTS).map(Number));
    const upNum = ((chapter - 1) % maxUpanishad) + 1;
    const upDesc = UPANISHAD_TEXTS[upNum] ?? UPANISHAD_TEXTS[1];
    contextClue = `This verse comes from the ${upDesc}.
Generate a verse that thematically fits this Upanishad's core teaching. Use concepts appropriate to that text.`;
  }

  const name = SCRIPTURE_NAMES[scripture] ?? scripture;
  return `You are an expert Sanskrit scholar specialising in ${name}.
Generate verse ${verse} from chapter/section ${chapter} of the ${name}.

${contextClue}

Respond ONLY with a valid JSON object (no markdown fences, no extra text) in exactly this shape:
{
  "slok": "<Sanskrit verse in Devanagari, 1-4 lines, genuine to the tradition>",
  "transliteration": "<IAST transliteration matching the Sanskrit above>",
  "prabhu": {
    "author": "Scholarly Translation",
    "et": "<accurate English translation of this specific verse>",
    "ec": "<1-2 sentences of scholarly commentary specific to this verse's meaning>"
  },
  "sankar": {
    "author": "Classical Commentary",
    "et": "<alternative English rendering with slightly different nuance>",
    "ec": "<classical interpretation connecting this verse to its broader philosophical context>"
  }
}

The Sanskrit and content MUST be unique to chapter ${chapter}, verse ${verse} — do not reuse generic filler text.`;
}


async function callOpenAI(apiKey: string, prompt: string): Promise<string> {
  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 600,
  });
  return completion.choices[0]?.message?.content ?? "{}";
}

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  let raw = response.text ?? "{}";
  raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return raw;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ scripture: string; chapter: string; verse: string }> }
) {
  const { scripture, chapter, verse } = await params;
  const ch = parseInt(chapter, 10);
  const v = parseInt(verse, 10);

  if (!(scripture in SCRIPTURE_NAMES) || isNaN(ch) || isNaN(v)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const prompt = buildPrompt(scripture, ch, v);
  let raw: string;

  try {
    if (openaiKey) {
      raw = await callOpenAI(openaiKey, prompt);
    } else if (geminiKey) {
      try {
        raw = await callGemini(geminiKey, prompt);
      } catch (e: unknown) {
        if ((e as { status?: number })?.status === 429 && openaiKey) {
          raw = await callOpenAI(openaiKey!, prompt);
        } else throw e;
      }
    } else {
      return NextResponse.json({ error: "No AI key configured" }, { status: 503 });
    }

    const parsed = JSON.parse(raw) as Partial<GitaVerse>;
    const result: GitaVerse = {
      _id: `${scripture}-${ch}-${v}`,
      chapter: ch,
      verse: v,
      slok: parsed.slok ?? "",
      transliteration: parsed.transliteration ?? "",
      prabhu: parsed.prabhu,
      sankar: parsed.sankar,
    };

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
  } catch (err) {
    console.error("[verse API]", err);
    return NextResponse.json({ error: "Failed to generate verse" }, { status: 500 });
  }
}
