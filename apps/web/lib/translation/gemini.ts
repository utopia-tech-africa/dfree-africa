import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash";
const isDev = process.env.NODE_ENV === "development";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? "";
  if (!apiKey.trim()) {
    if (isDev) {
      console.warn(
        "[translation] No GEMINI_API_KEY or GOOGLE_API_KEY in env. Add one to .env.local (see .env.example). CMS content will show in source language.",
      );
    }
    return null;
  }
  client = new GoogleGenAI({ apiKey: apiKey.trim() });
  return client;
}

const LOCALE_TO_LANGUAGE: Record<string, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
};

/**
 * Translate text from English to the target locale using Gemini.
 * Returns original text if API key is missing, or translation fails.
 */
export async function translateWithGemini(
  text: string,
  targetLocale: string,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const ai = getClient();
  if (!ai) return text;

  const targetLanguage = LOCALE_TO_LANGUAGE[targetLocale] ?? targetLocale;

  const prompt = `You are a professional translator. Translate the following text from English to ${targetLanguage}. Preserve any HTML tags or placeholders exactly. Return only the translated text, no explanations or quotes. Keep the same tone and register.

Text to translate:
${trimmed}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const translated =
      typeof (response as { text?: string })?.text === "string"
        ? (response as { text: string }).text.trim()
        : extractTextFromResponse(response);

    if (!translated && isDev) {
      console.warn(
        "[translation] Gemini returned empty text for:",
        trimmed.slice(0, 50) + "...",
      );
    }
    return translated || text;
  } catch (err) {
    if (isDev) {
      console.error(
        "[translation] Gemini error:",
        err instanceof Error ? err.message : err,
      );
    }
    return text;
  }
}

interface GeminiPart {
  text?: string;
}
interface GeminiContent {
  parts?: GeminiPart[];
}
interface GeminiCandidate {
  content?: GeminiContent;
}
function extractTextFromResponse(response: unknown): string {
  try {
    const r = response as { candidates?: GeminiCandidate[] };
    const part = r?.candidates?.[0]?.content?.parts?.[0];
    return typeof part?.text === "string" ? part.text.trim() : "";
  } catch {
    return "";
  }
}
