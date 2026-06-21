function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderAcknowledgementBody(
  bodyHtml: string,
  submitterName?: string | null,
): string {
  const trimmedName = submitterName?.trim();

  if (trimmedName) {
    return bodyHtml.replaceAll("{{name}}", escapeHtml(trimmedName));
  }

  return bodyHtml
    .replaceAll(/Hi \{\{name\}\},/g, "Hi,")
    .replaceAll(/Hi \{\{name\}\}/g, "Hi")
    .replaceAll("{{name}}", "");
}
