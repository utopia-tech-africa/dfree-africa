import {
  translatePortableText,
  translateText,
  type PortableTextBlock,
} from "@/lib/translation";
import { urlFor } from "./image";
import { client } from "./client";
import {
  eventsQuery,
  featuredEventsQuery,
  eventsCountQuery,
  eventCategoriesQuery,
  eventBySlugQuery,
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
  linkToDetailsPage?: boolean;
  featured?: boolean;
};

export type EventDetailForUI = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tag?: string;
  description: string;
  details: PortableTextBlock[];
  imageUrl: string;
  imageAlt?: string;
  additionalImages: string[];
  location: string;
  eventDate: string;
  link?: string;
  linkToDetailsPage?: boolean;
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
  linkToDetailsPage?: boolean;
  featured?: boolean;
  sortOrder?: number;
};

type SanityEventDetail = SanityEvent & {
  details?: PortableTextBlock[] | null;
  additionalImages?: Array<{ asset?: unknown } | null>;
};

function resolveEventLink(
  event: Pick<SanityEvent, "slug" | "link" | "linkToDetailsPage">,
): string {
  if (event.linkToDetailsPage && event.slug) {
    return `/events/${event.slug}`;
  }

  return event.link || "/events";
}

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
    link: resolveEventLink(event),
    linkToDetailsPage: event.linkToDetailsPage ?? false,
    featured: event.featured ?? false,
  };
}

function mapEventDetailToUI(event: SanityEventDetail): EventDetailForUI {
  const tag = event.tag?.trim();
  const additionalImages =
    event.additionalImages
      ?.filter(
        (img): img is NonNullable<typeof img> =>
          img != null && img.asset != null,
      )
      .map((img) => urlFor(img).width(1200).fit("max").auto("format").url()) ??
    [];

  return {
    _id: event._id,
    title: event.title ?? "",
    slug: event.slug ?? "",
    category: event.category ?? undefined,
    tag: tag || undefined,
    description: event.description ?? "",
    details: event.details ?? [],
    imageUrl: event.imageUrl ?? "",
    imageAlt: event.imageAlt ?? undefined,
    additionalImages,
    location: event.location ?? "",
    eventDate: event.eventDate ?? "",
    link: event.link ?? undefined,
    linkToDetailsPage: event.linkToDetailsPage ?? false,
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
  currentSlug?: string | null,
): Promise<EventForUI[]> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = await client.fetch<SanityEvent[]>(eventsQuery, {
    category: category ?? null,
    currentSlug: currentSlug ?? null,
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

export async function getEventBySlug(
  slug: string,
  locale?: LocaleForTranslation,
): Promise<EventDetailForUI | null> {
  const data = await client.fetch<SanityEventDetail | null>(eventBySlugQuery, {
    slug,
  });

  if (!data) return null;

  const base = mapEventDetailToUI(data);

  if (!locale || locale === "en") return base;

  const [title, description, details, location] = await Promise.all([
    translateText(base.title, locale),
    translateText(base.description, locale),
    translatePortableText(base.details, locale),
    translateText(base.location, locale),
  ]);

  return {
    ...base,
    title,
    description,
    details,
    location,
  };
}
