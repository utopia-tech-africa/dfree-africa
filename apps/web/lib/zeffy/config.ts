export type ZeffyConfig = {
  apiKey: string;
};

export function getZeffyConfig(): ZeffyConfig | null {
  const apiKey = process.env.ZEFFY_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return { apiKey };
}
