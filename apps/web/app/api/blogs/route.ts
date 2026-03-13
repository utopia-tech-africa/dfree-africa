import { NextRequest, NextResponse } from "next/server";
import { getBlogs } from "@/lib/sanity";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const currentSlugParam = searchParams.get("currentSlug");
  const localeParam = searchParams.get("locale") ?? routing.defaultLocale;

  const safeLocale = routing.locales.includes(localeParam as any)
    ? (localeParam as (typeof routing.locales)[number])
    : routing.defaultLocale;

  const blogs = await getBlogs(
    currentSlugParam && currentSlugParam.length > 0
      ? currentSlugParam
      : undefined,
    safeLocale,
  );

  return NextResponse.json(blogs);
}
