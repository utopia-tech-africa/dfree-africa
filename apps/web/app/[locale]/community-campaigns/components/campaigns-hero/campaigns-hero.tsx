import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";

export const CampaignsHero = async () => {
  const t = await getTranslations("communityCampaigns.hero");
  const locale = await getLocale();

  const contentWidthClass =
    locale === "fr"
      ? "max-w-[98%] xs:max-w-[540px] sm:max-w-140 md:max-w-180 lg:max-w-[62rem]"
      : locale === "es"
        ? "max-w-[95%] xs:max-w-[480px] sm:max-w-140 md:max-w-170 lg:max-w-[54rem]"
        : "max-w-[90%] xs:max-w-[400px] sm:max-w-125 md:max-w-150 lg:max-w-190";

  return (
    <section className="relative w-full min-h-150 h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773147892/57b6d58e-b3d4-4a96-bb5d-58341b71c924.webp"
          }
          alt={t("imageAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[#000000]/60" aria-hidden />

      <ComponentLayout className="w-full h-full z-10 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="w-full text-start">
          <div className={contentWidthClass}>
            <h1 className="font-montserrat mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-5xl lg:text-[60px] xl:text-[60px] font-bold leading-[1.2] text-white">
              {t("title")}
            </h1>

            <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white font-poppins font-normal max-w-[95%] sm:max-w-full">
              {t("subtitle")}
            </p>

            <Link
              href={t("ctaHref")}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-sm sm:text-base inline-flex",
              )}
            >
              {t("ctaLabel")}
            </Link>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
