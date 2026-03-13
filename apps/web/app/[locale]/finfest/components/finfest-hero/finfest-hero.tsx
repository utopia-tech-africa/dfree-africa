import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";

export const FinfestHero = async () => {
  const t = await getTranslations("finfest.hero");
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
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
        {/* text - takes only what it needs */}
        <div className="mx-auto shrink-0 text-center">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl md:text-4xl lg:text-[42px]">
            {t("mainTitle")}
          </h1>

          <p className="mt-4 max-w-180 mx-auto text-center text-sm leading-[130%] text-neutral-900 md:text-base lg:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-6 flex justify-center">
            <Button variant="default" size="lg" className="rounded-full px-8">
              {t("registerNow")}
            </Button>
          </div>
        </div>

        {/* hero img - takes the rest of the height */}
        <div className="mt-12 min-h-0 flex-1">
          <div className=" w-full overflow-hidden rounded-lg">
            <Image
              src="https://res.cloudinary.com/dan9camhs/image/upload/v1773236329/7d47e665-0efa-4358-9b62-3ce55a050c4d.webp"
              height={600}
              width={900}
              alt={t("imageAlt")}
              priority
              className="w-full h-auto object-cover sm:h-[55vh] md:h-[65vh] lg:h-[80vh] xl:h-[90vh]"
            />
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
