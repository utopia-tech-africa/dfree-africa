const HTML_ENTITY_MAP: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(?:nbsp|amp|lt|gt|quot|#39|apos);/gi, (entity) => {
    const normalized = entity.toLowerCase();
    return HTML_ENTITY_MAP[normalized] ?? entity;
  });
}

/** Strip HTML markup from Zeffy campaign copy for card display. */
export function htmlToPlainText(html: string): string {
  if (!html.trim()) {
    return "";
  }

  const withoutTags = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  return decodeHtmlEntities(withoutTags).replace(/\s+/g, " ").trim();
}
