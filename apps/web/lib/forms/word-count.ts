export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function wordCountMessage(current: number, max: number): string {
  return `Words: ${current} / ${max}`;
}
