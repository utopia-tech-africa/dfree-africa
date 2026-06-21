function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function looksLikeHtml(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(value);
}

export function bodyHtmlToPlainText(bodyHtml: string): string {
  if (!looksLikeHtml(bodyHtml)) {
    return bodyHtml;
  }

  return bodyHtml
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<\/?p[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export function plainTextToBodyHtml(bodyText: string): string {
  const paragraphs = bodyText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return "";
  }

  return paragraphs
    .map(
      (paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`,
    )
    .join("\n");
}

export function normalizeBodyTextForDisplay(value: string): string {
  return bodyHtmlToPlainText(value).replace(/\r\n/g, "\n");
}

export function normalizeBodyTextForStorage(value: string): string {
  const normalized = value.replace(/\r\n/g, "\n").trim();

  if (looksLikeHtml(normalized)) {
    return bodyHtmlToPlainText(normalized);
  }

  return normalized;
}
