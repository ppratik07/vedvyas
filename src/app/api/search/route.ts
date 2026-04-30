import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { SearchResult } from "@/lib/types";

const SYSTEM_PROMPT = `You are a scholar of Hindu scriptures — the Vedas, Upanishads, Bhagavad Gita, Ramayana, and Mahabharata. When answering questions:
1. Draw from multiple scriptures when relevant.
2. Quote specific verses (cite them like "BG 2.47", "RV 10.129", "KU 1.1", etc.).
3. Explain complex philosophical terms (karma, dharma, atman, brahman, moksha, maya, etc.) clearly.
4. Be respectful, scholarly, and nuanced.

Respond ONLY with a valid JSON object (no markdown fences) in this exact shape:
{
  "synthesis": "<rich multi-paragraph HTML-safe explanation using <em> for emphasis and <strong> for key terms>",
  "citations": [
    { "id": "BG 2.47", "verse": "karmany-evadhikaras te...", "context": "On the nature of action" },
    { "id": "BG 4.17", "verse": "karmano hy api boddavyam...", "context": "On right understanding of action" },
    { "id": "BG 3.9", "verse": "yajnarthat karmano nyatra...", "context": "On sacrifice and bondage" }
  ],
  "relatedConcepts": ["Svadharma", "Bhakti Yoga", "Prakriti", "Gunas", "Samsara", "Purushartha"],
  "visualStudyTitle": "The Path of Renunciation"
}`;

function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, "").substring(0, 500).trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body.query !== "string") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const query = sanitizeInput(body.query);
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return rich mock data when no API key is configured
      const mock: SearchResult = {
        synthesis: `<p>In the <em>Bhagavad Gita</em>, <strong>Karma</strong> is not merely a system of cosmic retribution, but a path toward spiritual liberation (<em>Moksha</em>). Krishna emphasizes that action is inevitable for all living beings, yet the binding nature of action can be transcended through the practice of <strong>Nishkama Karma</strong> — action performed without attachment to the results.</p><p>&ldquo;You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.&rdquo;</p><p>The synthesis of various commentaries suggests that 'Karma' operates on three levels: <strong>Karma</strong> (right action), <em>Vikarma</em> (wrong action), and <strong>Akarma</strong> (inaction or selfless action). To achieve tranquility, one must transform everyday work into a form of sacrificial offering (<em>Yajna</em>), thereby neutralizing the karmic seeds that lead to further rebirth.</p>`,
        citations: [
          { id: "BG 2.47", verse: "karmany-evadhikaras te ma phaleshu kadachana...", context: "On the nature of action", href: "/reader/bhagavad-gita/2/47" },
          { id: "BG 4.17", verse: "karmano hy api boddhavyam boddhavyam cha vikarmanah...", context: "On understanding right and wrong action", href: "/reader/bhagavad-gita/4/17" },
          { id: "BG 3.9", verse: "yajnarthat karmano nyatra loko yam karma-bandhanah...", context: "On sacrifice and freedom from bondage", href: "/reader/bhagavad-gita/3/9" },
        ],
        relatedConcepts: ["Svadharma", "Bhakti Yoga", "Prakriti", "Gunas", "Samsara", "Purushartha"],
        visualStudyTitle: "The Path of Renunciation",
      };
      return NextResponse.json(mock);
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Question: ${query}` },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let result: SearchResult;
    try {
      result = JSON.parse(raw);
    } catch {
      result = {
        synthesis: raw,
        citations: [],
        relatedConcepts: [],
        visualStudyTitle: "Scriptural Study",
      };
    }

    // Add hrefs to citations
    result.citations = (result.citations ?? []).map((c) => ({
      ...c,
      href: citationToHref(c.id),
    }));

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Search API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function citationToHref(id: string): string {
  // Parse "BG 2.47" → /reader/bhagavad-gita/2/47
  const bgMatch = id.match(/BG\s+(\d+)\.(\d+)/i);
  if (bgMatch) return `/reader/bhagavad-gita/${bgMatch[1]}/${bgMatch[2]}`;

  const rvMatch = id.match(/RV\s+(\d+)\.(\d+)/i);
  if (rvMatch) return `/reader/rig-veda/${rvMatch[1]}/${rvMatch[2]}`;

  return "/reader/bhagavad-gita/1/1";
}
