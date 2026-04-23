"use client";

import { FC, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export interface NewsCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  readTime?: number;
  category?: string;
  tags?: string[];
}

export const NewsCard: FC<NewsCardProps> = ({
  title,
  excerpt,
  imageUrl,
  slug,
  readTime,
  category,
  tags,
}) => {
  const t = useTranslations("home.news");
  const router = useRouter();
  const href = `/news/${slug}`;

  const prefetchDetail = useCallback(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <div className="group w-full h-full flex flex-col rounded-lg shadow-md overflow-hidden border ">
      {imageUrl && (
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={405}
            height={275}
            className="h-60 w-full object-cover transition-transform duration-400 group-hover:scale-110 ease-out "
          />
        </div>
      )}
      <div className="flex flex-col flex-1 justify-between p-4 gap-8 bg-white rounded-t-2xl -mt-4.5 z-10">
        <div className="">
          {(category || (tags && tags.length > 0)) && (
            <span className="inline-block w-fit px-2 py-1 text-xs 2xl:text-sm font-poppinsrounded-[4px] text-neutral-100 bg-tertiary-600 mb-6 rounded ">
              {[category, tags?.[0]].filter(Boolean).join(" | ")}
            </span>
          )}

          <div className="">
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <p className="text-neutral-900 text-lg leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <Link
            href={href}
            prefetch
            onMouseEnter={prefetchDetail}
            onFocus={prefetchDetail}
          >
            <Button
              variant="link"
              className="px-0 text-lg leading-[130%] font-semibold text-primary-600 gap-2 hover:underline"
            >
              {t("readMoreCta")}
              <ChevronRight size={16} />
            </Button>
          </Link>

          <p className="text-neutral-700 font-medium text-sm leading-relaxed line-clamp-3 mt-1 ml-2">
            {readTime} min read
          </p>
        </div>
      </div>
    </div>
  );
};
