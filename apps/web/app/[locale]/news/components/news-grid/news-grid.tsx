import React from "react";
import ComponentLayout from "@/components/component-layout";
import { NewsCard } from "@/app/components/news/news-card";
import { getNews, LocaleForTranslation } from "@/lib/sanity";
import { Newspaper } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface NewsGridProps {
  category: string | null;
  locale: LocaleForTranslation;
  page?: number;
}

export const NewsGrid = async ({
  category,
  locale,
  page = 1,
}: NewsGridProps) => {
  const [t, news] = await Promise.all([
    getTranslations("home.news.featuredNews"),
    getNews(undefined, locale, undefined, category, page),
  ]);

  if (!news.length) {
    return (
      <ComponentLayout className="py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-neutral-50 p-6 rounded-full border border-neutral-100 shadow-sm transition-transform hover:scale-105 duration-300">
            <Newspaper className="size-12 text-neutral-300" />
          </div>
          <div className="max-w-md">
            <p className="text-neutral-500 text-lg leading-relaxed">
              {t("emptyState.description")}
            </p>
          </div>
        </div>
      </ComponentLayout>
    );
  }

  return (
    <ComponentLayout className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {news.map((item) => (
          <NewsCard key={item._id} {...item} />
        ))}
      </div>
    </ComponentLayout>
  );
};
