import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const Filings = async () => {
  const t = await getTranslations("home.leadership.filings");

  return (
    <div className="space-y-5 scroll-mt-20" id="filings">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-1000 dark:text-neutral-100 font-montserrat tracking-tight">
          {t("title")}
        </h2>
      </div>

      {/* Content Card */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 space-y-8">
        {/* Description */}
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl font-poppins">
          {t("description")}
        </p>

        {/* Logo*/}
        <div className="relative w-24 h-24 md:w-32 md:h-32 ">
          <Image
            src="https://res.cloudinary.com/dan9camhs/image/upload/v1779293266/filings_image_logo_tuelip.png"
            alt={t("title")}
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 w-full">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-fit",
            )}
          >
            {t("cta1")}
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-fit",
            )}
          >
            {t("cta2")}
          </Link>
        </div>
      </div>
    </div>
  );
};
