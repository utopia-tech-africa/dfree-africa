import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";

export const CampaignsImpact = async () => {
  const t = await getTranslations("communityCampaigns.impact");

  return (
    <ComponentLayout>
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <Title
              text={t("title")}
              className="mb-4 leading-[130%] font-montserrat"
            />

            <h2 className="text-lg md:text-2xl lg:text-[26px] font-bold font-montserrat leading-[120%] text-neutral-1000 mb-4">
              {t("subtitle")}
            </h2>

            <p className="text-neutral-900 text-base md:text-lg leading-[130%] mb-4">
              {t("description")}
            </p>

            <Link href="#" className="w-fit mt-2">
              <Button
                variant="default"
                size="default"
                className="h-auto gap-3 px-3 py-2 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
                icon={
                  <ArrowRight
                    className="size-4.5 shrink-0 md:size-5"
                    strokeWidth={2}
                  />
                }
              >
                {t("buttonText")}
              </Button>
            </Link>
          </div>

          <div className="relative lg:col-span-3 w-full aspect-[4/3] lg:aspect-auto lg:h-auto rounded-lg overflow-hidden">
            <Image
              src={
                "https://res.cloudinary.com/dan9camhs/image/upload/v1773226697/71042cb3-075a-40e4-a352-b9807e51561a.webp"
              }
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain lg:object-cover lg:mask-[linear-gradient(90deg,transparent_0%,black_20%,black_100%)] lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_20%,black_100%)]
  "
            />
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
