"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MerchItemForUI } from "@/lib/sanity";

type CardProps = {
  item: MerchItemForUI;
};

export function MerchCard({ item }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded overflow-hidden flex flex-col shadow-xl transition-all duration-500 ease-in-out select-none",
        "w-[260px] xs:w-[280px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[450px] md:h-[500px]",
      )}
    >
      {/* Cover image — 80% of card height */}
      <div className="relative flex-1 bg-gray-100">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.coverImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 260px, 340px"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-300">
            <span className="text-5xl">📦</span>
          </div>
        )}
      </div>

      {/* Card info panel */}
      <div className="bg-white p-3 shrink-0">
        <p className="font-montserrat font-bold leading-snug text-lg sm:text-xl">
          {item.title}
        </p>
        <p className="font-roboto text-xm text-gray-500 mt-1">
          {item.category}
        </p>
        <p className="font-roboto font-semibold text-lg mt-2 text-neutral-900">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
