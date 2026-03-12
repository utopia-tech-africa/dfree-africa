"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  title: string;
  excerpt: string;
  mainImage: string;
  slug: string;
  readTime?: number;
}

export const BlogCard: FC<BlogCardProps> = ({
  title,
  excerpt,
  mainImage,
  slug,
  readTime,
}) => {
  return (
    <div className="group w-full h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          width={405}
          height={275}
          className="h-60 w-full object-cover transition-transform duration-400 group-hover:scale-110 ease-out"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {readTime && (
          <div
            className={cn(
              "flex items-center text-sm nline-block w-fit px-3 py-1 font-semibold text-black bg-[#EEEEEE] mb-3",
            )}
          >
            <span>{readTime} min read</span>
          </div>
        )}
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-neutral-900 font-medium text-lg leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        <Link href={`/blog/${slug}`}>
          <Button
            variant="link"
            className="px-0 text-lg leading-[130%] font-semibold text-primary-600 gap-2 hover:no-underline"
          >
            Read more
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
