import React from "react";
import { OtherNewsCarousel } from "./other-news-carousel";
import { getNews, LocaleForTranslation } from "@/lib/sanity";

interface OtherNewsProps {
  currentSlug: string;
  locale: LocaleForTranslation;
}

export const OtherNews = async ({ currentSlug, locale }: OtherNewsProps) => {
  // Fetch up to 12 news items to get a good random selection
  const news = await getNews(currentSlug, locale, undefined);

  // Shuffle and pick up to 6
  const displayNews = [...news]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((item) => ({
      ...item,
      imageUrl: item.imageUrl || "", // Ensure imageUrl is a string
    }));

  if (!displayNews.length) return null;

  return <OtherNewsCarousel news={displayNews} />;
};
