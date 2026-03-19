import { translateText } from "@/lib/translation";
import { client } from "./client";
import { pastSpeakersQuery } from "./queries/past-speaker";

export type PastSpeaker = {
  _id: string;
  name: string;
  role: string;
  image: string;
};

export async function getPastSpeakers(locale?: string): Promise<PastSpeaker[]> {
  const data = await client.fetch(pastSpeakersQuery);

  if (!locale || locale === "en") return data;

  return Promise.all(
    data.map(async (speaker: PastSpeaker) => ({
      ...speaker,
      name: await translateText(speaker.name, locale),
      role: await translateText(speaker.role, locale),
    })),
  );
}
