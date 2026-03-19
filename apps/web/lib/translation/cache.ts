import { kv } from "@vercel/kv";

/**
 * L1 in-memory cache for translations. Key: content hash + locale.
 * L2 Vercel KV (when configured) for persistence across cold starts.
 */
const memoryCache = new Map<string, string>();

const MAX_ENTRIES = 5000;
const KV_PREFIX = "translation";
const KV_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function isKvConfigured(): boolean {
  // Supports both Vercel KV and Redis-style integrations.
  return Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
    (process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN) ||
    process.env.REDIS_URL,
  );
}

function evictIfNeeded(): void {
  if (memoryCache.size >= MAX_ENTRIES) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey != null) memoryCache.delete(firstKey);
  }
}

function kvKey(key: string): string {
  return `${KV_PREFIX}:${key}`;
}

export async function getCachedTranslation(
  key: string,
): Promise<string | undefined> {
  const memoryValue = memoryCache.get(key);
  if (memoryValue != null) return memoryValue;

  if (!isKvConfigured()) return undefined;

  try {
    const value = await kv.get<string>(kvKey(key));
    if (value != null) {
      evictIfNeeded();
      memoryCache.set(key, value);
      return value;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function setCachedTranslation(
  key: string,
  value: string,
): Promise<void> {
  evictIfNeeded();
  memoryCache.set(key, value);

  if (!isKvConfigured()) return;

  try {
    await kv.set(kvKey(key), value, { ex: KV_TTL_SECONDS });
  } catch {
    // Ignore KV failures; in-memory cache still works.
  }
}

export function cacheKey(content: string, targetLocale: string): string {
  return `${targetLocale}:${content.length}:${hashString(content)}`;
}

/** Simple non-crypto hash for cache key (speed over security). */
function hashString(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return String(h >>> 0);
}
