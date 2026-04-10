import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash";
const isDev = process.env.NODE_ENV === "development";
const MAX_CONCURRENT_REQUESTS = 2;
const MIN_REQUEST_INTERVAL_MS = 250;
const RETRY_DELAY_MS = 1200;
const RETRYABLE_CODE_PATTERN = /429|quota|resource_exhausted|rate/i;

let client: GoogleGenAI | null = null;
let activeRequests = 0;
let lastRequestStartedAt = 0;
const waitQueue: Array<() => void> = [];

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

  return runLimited(async () => {
    try {
      return await requestTranslation(ai, prompt, text, trimmed);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (RETRYABLE_CODE_PATTERN.test(message)) {
        await sleep(RETRY_DELAY_MS);
        try {
          return await requestTranslation(ai, prompt, text, trimmed);
        } catch (retryErr) {
          if (isDev) {
            console.error(
              "[translation] Gemini retry failed:",
              retryErr instanceof Error ? retryErr.message : retryErr,
            );
          }
          return text;
        }
      }

      if (isDev) {
        console.error("[translation] Gemini error:", message);
      }
      return text;
    }
  });
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

async function requestTranslation(
  ai: GoogleGenAI,
  prompt: string,
  fallback: string,
  debugSample: string,
): Promise<string> {
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
      debugSample.slice(0, 50) + "...",
    );
  }

  return translated || fallback;
}

async function runLimited<T>(task: () => Promise<T>): Promise<T> {
  await acquireSlot();
  try {
    return await task();
  } finally {
    releaseSlot();
  }
}

async function acquireSlot(): Promise<void> {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
    await new Promise<void>((resolve) => waitQueue.push(resolve));
  }

  activeRequests += 1;
  const now = Date.now();
  const waitMs = Math.max(
    0,
    MIN_REQUEST_INTERVAL_MS - (now - lastRequestStartedAt),
  );
  if (waitMs > 0) await sleep(waitMs);
  lastRequestStartedAt = Date.now();
}

function releaseSlot(): void {
  activeRequests = Math.max(0, activeRequests - 1);
  const next = waitQueue.shift();
  if (next) next();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
