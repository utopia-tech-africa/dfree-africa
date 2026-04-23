import { translateText, translatePortableText } from "@/lib/translation";
import { client } from "./client";
import { urlFor } from "./image";
import {
  newsQuery,
  featuredNewsQuery,
  newsBySlugQuery,
  newsCategoriesQuery,
  newsCountQuery,
} from "./queries/news";

export type LocaleForTranslation = "en" | "fr" | "es";

export type NewsForUI = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime?: number;
  publishedDate?: string;
  category?: string;
  tags?: string[];
  imageUrl: string;
};

export type NewsDetailForUI = NewsForUI & {
  body: any;
  authorName?: string;
  authorImage?: string;
};

function mapNewsToUI(news: any): NewsForUI {
  return {
    _id: news._id,
    title: news.title ?? "",
    slug: news.slug ?? "",
    excerpt: news.excerpt ?? "",
    readTime: news.readTime ?? undefined,
    publishedDate: news.publishedDate ?? undefined,
    category: news.category ?? undefined,
    tags: news.tags ?? [],
    imageUrl: news.mainImage ?? "",
  };
}

export async function getNews(
  currentSlug?: string,
  locale?: LocaleForTranslation,
  featured?: boolean,
  category?: string | null,
  page: number = 1,
  limit: number = 12,
): Promise<NewsForUI[]> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = await client.fetch(newsQuery, {
    currentSlug: currentSlug ?? null,
    featured: featured ?? null,
    category: category ?? null,
    startIndex,
    endIndex,
  });
  const list = data.map(mapNewsToUI);

  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (news: NewsForUI) => ({
      ...news,
      title: await translateText(news.title, locale),
      excerpt: await translateText(news.excerpt, locale),
    })),
  );
}

export async function getFeaturedNews(
  locale?: LocaleForTranslation,
): Promise<NewsForUI[]> {
  const data = await client.fetch(featuredNewsQuery);
  const list = data.map(mapNewsToUI);

  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (news: NewsForUI) => ({
      ...news,
      title: await translateText(news.title, locale),
      excerpt: await translateText(news.excerpt, locale),
    })),
  );
}

export async function getNewsCount(
  currentSlug?: string,
  featured?: boolean,
  category?: string | null,
): Promise<number> {
  return await client.fetch(newsCountQuery, {
    currentSlug: currentSlug ?? null,
    featured: featured ?? null,
    category: category ?? null,
  });
}

export async function getNewsBySlug(
  slug: string,
  locale?: LocaleForTranslation,
): Promise<NewsDetailForUI | null> {
  const news = await client.fetch(newsBySlugQuery, { slug });

  if (!news) return null;

  const base = {
    ...mapNewsToUI(news),
    body: news.body ?? [],
    authorName: news.authorName ?? undefined,
    authorImage: news.authorImage ?? undefined,
  };

  if (!locale || locale === "en") return base;

  const [title, excerpt, body, authorName] = await Promise.all([
    translateText(base.title, locale),
    translateText(base.excerpt, locale),
    translatePortableText(base.body, locale),
    base.authorName
      ? translateText(base.authorName, locale)
      : Promise.resolve(undefined),
  ]);

  return {
    ...base,
    title,
    excerpt,
    body,
    authorName: authorName ?? base.authorName,
  };
}

export async function getNewsCategories(): Promise<string[]> {
  const categories = await client.fetch(newsCategoriesQuery);
  return categories || [];
}
