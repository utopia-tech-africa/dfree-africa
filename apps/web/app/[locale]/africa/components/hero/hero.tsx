import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { getTranslations } from "next-intl/server";

export const Hero = async () => {
  const t = await getTranslations("africa.hero");

  return (
    <section className="relative w-full min-h-[600px] h-dvh flex flex-col items-center justify-end overflow-hidden">
      {/* Background image - mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773145601/e6308848-6b5b-424c-b9c0-de4f3d434460.webp"
          }
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Background image - desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773145296/598147d8-bd38-4ac1-9157-8c726a58017c.webp"
          }
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#000000]/60" aria-hidden />

      {/* Content */}
      <ComponentLayout className="w-full z-10 flex flex-col items-center justify-center py-[94px] md:py-[156px]">
        <div className="text-center max-w-[343px] md:max-w-[708px]">
          <h1 className="font-montserrat w-full mb-3 text-[26px] font-bold leading-none tracking-tight text-neutral-100 md:text-[66px] lg:text-[70px] px-3">
            {t("title")}
          </h1>
          <p className="mb-6 w-full md:mb-8 text-sm md:text-lg md:font-medium leading-[1.3] text-neutral-200">
            {t("subtitle")}
          </p>

          <Link
            href={t("cta.href")}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "text-base",
            )}
          >
            {t("cta.label")}
          </Link>
        </div>
      </ComponentLayout>
    </section>
  );
};
