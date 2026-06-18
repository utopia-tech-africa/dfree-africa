import { NextRequest, NextResponse } from "next/server";
import { getEvents, getFeaturedEvents } from "@/lib/sanity";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featuredParam = searchParams.get("featured");
  const categoryParam = searchParams.get("category");
  const pageParam = searchParams.get("page");
  const localeParam = searchParams.get("locale") ?? routing.defaultLocale;

  const safeLocale = (routing.locales as readonly string[]).includes(
    localeParam,
  )
    ? (localeParam as (typeof routing.locales)[number])
    : routing.defaultLocale;

  const page = parseInt(pageParam || "1") || 1;

  const events =
    featuredParam === "true"
      ? await getFeaturedEvents(safeLocale)
      : await getEvents(safeLocale, categoryParam, page);

  return NextResponse.json(events, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
