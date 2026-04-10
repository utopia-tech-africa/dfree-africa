import { getCachedTranslation, setCachedTranslation, cacheKey } from "./cache";
import { translateWithGemini } from "./gemini";

const SOURCE_LOCALE = "en";
const REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 6; // 6 hours

/**
 * Tracks last background refresh per key to avoid hammering Gemini.
 */
const refreshMetadata = new Map<string, number>();

/**
 * Deduplicates in-flight translation requests for identical key+locale.
 */
const inFlight = new Map<string, Promise<string>>();

/**
 * Translate plain text. Uses in-memory cache. Returns original if target is source locale or translation is disabled.
 */
export async function translateText(
  text: string,
  targetLocale: string,
): Promise<string> {
  if (targetLocale === SOURCE_LOCALE) return text;
  const t = text.trim();
  if (!t) return text;

  const key = cacheKey(t, targetLocale);
  const cached = await getCachedTranslation(key);
  if (cached != null) {
    maybeRefreshInBackground(key, t, targetLocale, cached);
    return cached;
  }

  return translateAndCache(key, t, targetLocale, text);
}

/** Portable Text block child (span with text). */
export type PortableTextChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

/** Portable Text block. */
export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  children?: PortableTextChild[];
  [key: string]: unknown;
};

/**
 * Recursively translate all text nodes in Portable Text blocks.
 * Preserves structure; only translates child.text.
 */
export async function translatePortableText(
  blocks: PortableTextBlock[] | null | undefined,
  targetLocale: string,
): Promise<PortableTextBlock[]> {
  if (targetLocale === SOURCE_LOCALE || !blocks?.length) return blocks ?? [];

  return Promise.all(
    blocks.map(async (block) => {
      if (!block || typeof block !== "object") return block;

      const newBlock = { ...block } as PortableTextBlock;

      if (Array.isArray(block.children) && block.children.length > 0) {
        const newChildren = await Promise.all(
          block.children.map(async (child) => {
            if (child && typeof child.text === "string" && child.text.trim()) {
              const translated = await translateText(child.text, targetLocale);
              return { ...child, text: translated } as PortableTextChild;
            }
            return { ...child } as PortableTextChild;
          }),
        );
        newBlock.children = newChildren;
      }

      return newBlock;
    }),
  );
}

function maybeRefreshInBackground(
  key: string,
  text: string,
  targetLocale: string,
  fallback: string,
): void {
  const lastRefreshAt = refreshMetadata.get(key) ?? 0;
  const isStale = Date.now() - lastRefreshAt > REFRESH_INTERVAL_MS;
  if (!isStale) return;
  // Fire-and-forget stale refresh.
  void translateAndCache(key, text, targetLocale, fallback);
}

async function translateAndCache(
  key: string,
  text: string,
  targetLocale: string,
  fallback: string,
): Promise<string> {
  const existing = inFlight.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const translated = await translateWithGemini(text, targetLocale);
    const safeValue = translated || fallback;
    await setCachedTranslation(key, safeValue);
    refreshMetadata.set(key, Date.now());
    return safeValue;
  })();

  inFlight.set(key, promise);
  try {
    return await promise;
  } finally {
    inFlight.delete(key);
  }
}
