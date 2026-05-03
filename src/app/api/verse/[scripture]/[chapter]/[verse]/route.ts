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

function buildPrompt(scripture: string, chapter: number, verse: number): string {
  const name = SCRIPTURE_NAMES[scripture] ?? scripture;
  return `You are a Sanskrit scholar. Generate a realistic verse from the ${name}, Chapter/Book ${chapter}, Verse ${verse}.

Respond ONLY with a valid JSON object (no markdown fences) in this exact shape:
{
  "slok": "<authentic Sanskrit verse in Devanagari script>",
  "transliteration": "<IAST transliteration of the Sanskrit>",
  "prabhu": {
    "author": "Scholarly Translation",
    "et": "<accurate English translation of the verse>",
    "ec": "<1-2 sentence scholarly commentary on the verse's meaning>"
  },
  "sankar": {
    "author": "Classical Commentary",
    "et": "<alternative English rendering>",
    "ec": "<classical Vedantic interpretation of the verse>"
  }
}

Make the content authentic and appropriate to the chapter/verse number context of the ${name}. Vary the content meaningfully based on the chapter and verse numbers.`;
}

async function callOpenAI(apiKey: string, prompt: string): Promise<string> {
  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
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
