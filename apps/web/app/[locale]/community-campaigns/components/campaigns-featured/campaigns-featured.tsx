import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const FEATURED_SUBTEXT_KEYS = ["faithRooted", "realChange"] as const;

export const CampaignsFeatured = async () => {
  const t = await getTranslations("communityCampaigns.featured");

  return (
    <ComponentLayout className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center">
        <Title text={t("sectionTitle")} />
        <h1 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-[46px] leading-[120%] text-neutral-1000 my-4">
          {t("title")}
        </h1>
        <p className="text-neutral-800 mb-6">{t("description")}</p>

        <div className="flex flex-col md:flex-row md:gap-10 gap-6">
          {FEATURED_SUBTEXT_KEYS.map((key) => (
            <div key={key} className="flex-1 flex flex-col gap-2">
              <h3 className="text-neutral-1000 font-bold leading-[120%] text-lg md:text-xl lg:text-[22px]">
                {t(`subtexts.${key}.text`)}
              </h3>
              <p className="text-neutral-900 text-base md:text-lg">
                {t(`subtexts.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <Link href={t("href")} className="w-fit mt-8">
          <Button
            variant="default"
            size="default"
            className="h-auto gap-3 px-3 py-3 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
            icon={
              <ArrowRight
                className="size-4.5 shrink-0 md:size-5"
                strokeWidth={2}
              />
            }
          >
            {t("discoverMore")}
          </Button>
        </Link>
      </div>

      {/* Image Section - Fixed */}
      <div className="flex-1 w-full">
        <div className="relative w-full h-75 md:h-100 lg:h-full rounded-lg overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dan9camhs/image/upload/v1773225930/f4b3fae2-1a9b-4a63-8314-7f9a982c2bae.webp"
            }
            alt={t("imageAlt")}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
        </div>
      </div>
    </ComponentLayout>
  );
};
