import { NextRequest, NextResponse } from "next/server";
import { getNews, getFeaturedNews } from "@/lib/sanity";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const currentSlugParam = searchParams.get("currentSlug");
  const featuredParam = searchParams.get("featured");
  const categoryParam = searchParams.get("category");
  const localeParam = searchParams.get("locale") ?? routing.defaultLocale;

  const safeLocale = routing.locales.includes(localeParam as any)
    ? (localeParam as (typeof routing.locales)[number])
    : routing.defaultLocale;

  let news;
  if (featuredParam === "true") {
    news = await getFeaturedNews(safeLocale);
  } else {
    news = await getNews(
      currentSlugParam && currentSlugParam.length > 0
        ? currentSlugParam
        : undefined,
      safeLocale,
      featuredParam === "false" ? false : undefined,
      categoryParam,
    );
  }

  return NextResponse.json(news, {
    headers: {
      // Short browser cache + SWR for snappier locale toggles.
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
