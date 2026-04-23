import { PortableText } from "next-sanity";
import { getNewsBySlug } from "@/lib/sanity/news";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { OtherNews } from "@/app/components/news";
import ComponentLayout from "@/components/component-layout";
import { customPortableTextComponents } from "@/components/portable-text/custom-portable-text-components";
import { formatDateWithOrdinal } from "@/lib/utils";
import { LocaleForTranslation } from "@/lib/sanity";

interface NewsPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { locale, slug } = await params;

  const news = await getNewsBySlug(slug, locale as Locale);

  if (!news) return notFound();

  return (
    <>
      <ComponentLayout className="mt-20">
        <h1 className="font-bold mb-2 max-w-244.25 text-2xl md:text-3xl lg:text-[38px] text-neutral-1000 leading-[120%] font-montserrat">
          {news.title}
        </h1>

        <p className="text-neutral-900 font-normal text-base md:text-lg leading-[130%] mb-6">
          {news.excerpt}
        </p>

        {news.imageUrl && (
          <div className="relative w-full h-65 md:h-95 lg:h-140.75 mb-8">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}
        <div className="-mx-4 md:-mx-10 lg:-mx-20 h-0.5 bg-neutral-200 my-6" />

        {(news.authorName || news.authorImage) && (
          <div className="flex items-center gap-3 mb-10 rounded-full">
            {news.authorImage && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-linear-to-b from-[#7CDB17] to-[#42750C]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={news.authorImage}
                    alt={news.authorName || "Author"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {news.authorName && (
              <div>
                <p className="text-sm font-semibold">By {news.authorName}</p>
                <p className="text-xs text-neutral-500">
                  {news.publishedDate
                    ? formatDateWithOrdinal(news.publishedDate)
                    : ""}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="prose prose-neutral max-w-none mb-16 leading-[130%] text-lg">
          <PortableText
            value={news.body}
            components={customPortableTextComponents}
          />
        </div>
      </ComponentLayout>
      <OtherNews currentSlug={slug} locale={locale as LocaleForTranslation} />
    </>
  );
}
