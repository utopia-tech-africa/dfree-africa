import { Suspense } from "react";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { getTranslations } from "next-intl/server";
import {
  NewsFilter,
  NewsGrid,
  NewsGridSkeleton,
  NewsPagination,
} from "./components";
import {
  getNewsCategories,
  getNewsCount,
  LocaleForTranslation,
} from "@/lib/sanity";
import { routing } from "@/i18n/routing";

const NEWS_PER_PAGE = 12;

const NewsPage = async (props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}) => {
  const { locale } = await props.params;
  const { category, page } = await props.searchParams;

  const t = await getTranslations("home.news");
  const categories = await getNewsCategories();
  const selectedCategory = category || null;
  const currentPage = parseInt(page || "1") || 1;

  const safeLocale = (
    routing.locales.includes(locale as any) ? locale : routing.defaultLocale
  ) as LocaleForTranslation;

  const totalCount = await getNewsCount(undefined, undefined, selectedCategory);
  const totalPages = Math.ceil(totalCount / NEWS_PER_PAGE);

  return (
    <div className="flex flex-col my-20 lg:my-20">
      <ComponentLayout className="flex flex-col items-center text-center mb-10">
        <Subtitle text={t("title")} />
        <p className="text-neutral-800 text-lg mt-4 max-w-3xl">
          {t("description")}
        </p>
      </ComponentLayout>
      <NewsFilter categories={categories} selectedCategory={selectedCategory} />
      <Suspense
        key={`${safeLocale}-${selectedCategory}-${currentPage}`}
        fallback={<NewsGridSkeleton />}
      >
        <NewsGrid
          category={selectedCategory}
          locale={safeLocale}
          page={currentPage}
        />
      </Suspense>
      <NewsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default NewsPage;
