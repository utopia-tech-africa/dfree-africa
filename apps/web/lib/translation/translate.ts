import { getCachedTranslation, setCachedTranslation, cacheKey } from "./cache";
import { translateWithGemini } from "./gemini";

const SOURCE_LOCALE = "en";

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
  if (cached != null) return cached;

  const translated = await translateWithGemini(t, targetLocale);
  await setCachedTranslation(key, translated);
  return translated;
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
