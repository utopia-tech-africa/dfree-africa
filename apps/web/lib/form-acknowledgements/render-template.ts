export function renderAcknowledgementPlainText(
  bodyText: string,
  submitterName?: string | null,
): string {
  const trimmedName = submitterName?.trim();

  if (trimmedName) {
    return bodyText.replaceAll("{{name}}", trimmedName);
  }

  return bodyText
    .replaceAll(/Hi \{\{name\}\},/g, "Hi,")
    .replaceAll(/Hi \{\{name\}\}/g, "Hi")
    .replaceAll("{{name}}", "");
}
