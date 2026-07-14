import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { buttonVariants } from "@/components/ui/button";
import { SupportTheInstitutePattern } from "@/assets";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const SupportTheInstitute = async () => {
  const t = await getTranslations("leadershipInstitute.supportTheInstitute");

  const stats = [
    {
      value: t("stats.stat1.value"),
      description: t("stats.stat1.description"),
    },
    {
      value: t("stats.stat2.value"),
      description: t("stats.stat2.description"),
    },
    {
      value: t("stats.stat3.value"),
      description: t("stats.stat3.description"),
    },
    {
      value: t("stats.stat4.value"),
      description: t("stats.stat4.description"),
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Pattern */}
      <div className="hidden lg:block absolute left-0 right-0 top-1/2 translate-y-[-35%] w-full h-full pointer-events-none">
        {" "}
        <div className="w-full h-full">
          <SupportTheInstitutePattern className="w-full h-full" />
        </div>
      </div>

      <ComponentLayout className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Image */}
          <div className="relative overflow-hidden rounded-lg min-h-58 sm:min-h-72 lg:min-h-105 h-full">
            <Image
              src="https://res.cloudinary.com/dan9camhs/image/upload/v1779292426/72c20e7763ade68f84cd9a55ba4c079cdfa43c44_wxha1f.webp"
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center items-center mx-auto md:justify-between h-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <Title text={t("label")} />

                <h2 className="text-2xl md:text-[32px] font-bold font-montserrat leading-[1.2] text-neutral-1000">
                  {t("title")}
                </h2>

                <p className="text-base md:text-lg text-neutral-900 max-w-[50ch] leading-[1.3]">
                  {t("description")}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#587B35] leading-none">
                      {stat.value}
                    </h3>

                    <p className="mt-2 text-sm md:text-base text-neutral-800 leading-snug max-w-[27ch]">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 self-start">
              <Link
                href="/leadership-institute/sponsor"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "text-xs sm:text-base inline-flex flex-1 min-w-30 justify-center py-6",
                )}
              >
                {t("buttonText")}
              </Link>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
