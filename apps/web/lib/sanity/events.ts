import { translateText } from "@/lib/translation";
import { client } from "./client";
import {
  eventsQuery,
  featuredEventsQuery,
  eventsCountQuery,
  eventCategoriesQuery,
} from "./queries/events";
import type { LocaleForTranslation } from "./news";

export type EventForUI = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tag?: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  location: string;
  eventDate: string;
  link: string;
  featured?: boolean;
};

type SanityEvent = {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  tag?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  location?: string;
  eventDate?: string;
  link?: string;
  featured?: boolean;
  sortOrder?: number;
};

function mapEventToUI(event: SanityEvent): EventForUI {
  const tag = event.tag?.trim();

  return {
    _id: event._id,
    title: event.title ?? "",
    slug: event.slug ?? "",
    category: event.category ?? undefined,
    tag: tag || undefined,
    description: event.description ?? "",
    imageUrl: event.imageUrl ?? "",
    imageAlt: event.imageAlt ?? undefined,
    location: event.location ?? "",
    eventDate: event.eventDate ?? "",
    link: event.link ?? "/events",
    featured: event.featured ?? false,
  };
}

async function translateEvents(
  list: EventForUI[],
  locale?: LocaleForTranslation,
): Promise<EventForUI[]> {
  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (event) => ({
      ...event,
      title: await translateText(event.title, locale),
      description: await translateText(event.description, locale),
      location: await translateText(event.location, locale),
    })),
  );
}

export async function getEvents(
  locale?: LocaleForTranslation,
  category?: string | null,
  page: number = 1,
  limit: number = 12,
): Promise<EventForUI[]> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = await client.fetch<SanityEvent[]>(eventsQuery, {
    category: category ?? null,
    startIndex,
    endIndex,
  });

  return translateEvents(data.map(mapEventToUI), locale);
}

export async function getFeaturedEvents(
  locale?: LocaleForTranslation,
): Promise<EventForUI[]> {
  const data = await client.fetch<SanityEvent[]>(featuredEventsQuery);
  return translateEvents(data.map(mapEventToUI), locale);
}

export async function getEventsCount(
  category?: string | null,
): Promise<number> {
  return client.fetch(eventsCountQuery, {
    category: category ?? null,
  });
}

export async function getEventCategories(): Promise<string[]> {
  const categories = await client.fetch<string[]>(eventCategoriesQuery);
  return categories || [];
}
