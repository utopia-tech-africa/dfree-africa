/**
 * In-memory cache for translations. Key: content hash + locale.
 * Resets on cold start; replace with Redis/Vercel KV for persistent cache.
 */
const cache = new Map<string, string>();

const MAX_ENTRIES = 5000;

function evictIfNeeded(): void {
  if (cache.size >= MAX_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey != null) cache.delete(firstKey);
  }
}

export function getCachedTranslation(key: string): string | undefined {
  return cache.get(key);
}

export function setCachedTranslation(key: string, value: string): void {
  evictIfNeeded();
  cache.set(key, value);
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
