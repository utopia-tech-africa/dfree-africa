import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CalendarDays, MapPin } from "lucide-react";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";
import Link from "next/link";

export const FinfestHero = async () => {
  const t = await getTranslations("finfest.hero");

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden mt-6">
      {/* patterns */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-30 top-24 opacity-70 sm:-left-20 md:left-0 md:top-0">
          <FinfestHeroPattern />
        </div>

        <div className="absolute -right-30 top-24 scale-x-[-1] opacity-60 sm:-right-20 md:right-0 md:top-0">
          <FinfestHeroPattern />
        </div>
      </div>

      <ComponentLayout className="relative flex flex-1 flex-col pt-16">
        {/* text */}
        <div className="mx-auto shrink-0 text-center">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl md:text-4xl lg:text-[42px]">
            {t("mainTitle")}
          </h1>

          <p className="mt-4 max-w-180 mx-auto text-center text-sm leading-[130%] text-neutral-900 md:text-base lg:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-6 flex justify-center">
            <Link href="https://dfree.com/finfest/" target="_blank">
              <Button variant="default" size="lg" className="rounded-full px-8">
                {t("registerNow")}
              </Button>
            </Link>
          </div>
        </div>

        {/* hero img */}
        <div className="mt-12 min-h-0 flex-1">
          <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden rounded-lg">
            <Image
              src="https://res.cloudinary.com/dan9camhs/image/upload/v1779365746/9d749ac2c7741dab19a68da6078c9e31eb9cfadd_kbsmzi.jpg"
              alt={t("imageAlt")}
              priority
              fill
              className="object-cover"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

            {/* bottom content */}
            <div className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-4">
              <div className="flex flex-col items-center gap-4 text-white lg:flex-row lg:justify-center lg:gap-10">
                <div className="flex min-w-0 items-center gap-1 md:gap-2">
                  <CalendarDays className="size-4 shrink-0 sm:size-5" />
                  <p className="font-montserrat text-[clamp(14px,1.8vw,32px)] font-bold whitespace-nowrap leading-none">
                    {t("eventDate")}
                  </p>
                </div>
                <div className="flex min-w-0 items-center gap-1 md:gap-2">
                  <MapPin className="size-4 shrink-0 sm:size-5" />
                  <p className="font-montserrat text-[clamp(14px,1.8vw,32px)] font-bold whitespace-nowrap leading-none">
                    {t("eventLocation")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
