import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const FinfestBuildWealth = async () => {
  const t = await getTranslations("finfest.buildWealth");

  return (
    <ComponentLayout className="flex flex-col md:items-center md:justify-center gap-6 md:text-center my-20 ">
      <div className="gap-6 text-center">
        <h2 className="font-bold text-[38px] font-montserrat">
          {t.rich("title", {
            primary: (chunks) => (
              <span className="text-primary-500">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-poppins text-neutral-900 text-lg  leading-[120%]">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative flex gap-4 aspect-video md:aspect-2.5/1 w-full overflow-hidden rounded-2xl">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1780403002/040edaf1412af09b49e821b011fee03712ba2c69_yzdodw.png"
          }
          alt={t("imageAlt")}
          fill
          className="object-cover"
        />
      </div>

      {/* <FinfestVideos /> */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-2 md:gap-8 mt-4 lg:mt-5">
        <Link href="#" className="mt-2 w-fit">
          <Button
            variant="default"
            size="default"
            className="h-auto gap-3 px-4 py-2 text-sm leading-[1.3] font-light md:px-8 md:text-lg"
            icon={
              <ArrowRight
                className="size-4.5 shrink-0 md:size-6"
                strokeWidth={2}
              />
            }
          >
            {t("scheduleBtn")}
          </Button>
        </Link>
        <Link href="#" className="mt-2 w-fit">
          <Button
            variant="default"
            size="default"
            className="h-auto gap-3 px-4 py-2 text-sm leading-[1.3] font-light md:px-8 md:text-lg"
            icon={
              <ArrowRight
                className="size-4.5 shrink-0 md:size-6"
                strokeWidth={2}
              />
            }
          >
            {t("speakersBtn")}
          </Button>
        </Link>
        <Link href="#" className="mt-2 w-fit">
          <Button
            variant="default"
            size="default"
            className="h-auto gap-3 px-4 py-2 text-sm leading-[1.3] font-light md:px-8 md:text-lg"
            icon={
              <ArrowRight
                className="size-4.5 shrink-0 md:size-6"
                strokeWidth={2}
              />
            }
          >
            {t("partnerBtn")}
          </Button>
        </Link>
      </div>
    </ComponentLayout>
  );
};
