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

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {(
              [
                {
                  href: "https://whova.com/embedded/speakers/XsVSzIBghFQk0QxdXfdm7PHCpD7xPtM-D7xVxokoEmQ%3D/?utc_source=ems",
                  label: t("speakers"),
                  external: true,
                  buttonVariant: "secondary",
                },
                {
                  href: "https://whova.com/embedded/event/TTaQgapraankzJFUOFFNTNUIXoEBqx%40Xg%40lbf6DNP3k%3D/?utc_source=ems",
                  label: t("agenda"),
                  external: true,
                  buttonVariant: "secondary",
                },
                {
                  href: "https://dfree.xyz/FF2026",
                  label: t("registerNow"),
                  external: true,
                  buttonVariant: "default",
                },

                {
                  href: "https://www.marriott.com/en-gb/event-reservations/reservation-link.mi?id=1792445997733&key=GRP&app=resvlink&_branch_match_id=1628888251607145530&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi0uy0wtN7LPTLE1NLc0MjExtbQ0Nzc2VstOrbR1DwpQSywosAWpysnMy1arK0pNSy0qysxLj08qyi8vTi2ydc4oys9NBQCcDSu8YQAAAA%3D%3D",
                  label: t("hotel"),
                  external: true,
                  buttonVariant: "secondary",
                },
                {
                  href: "#sponsors",
                  label: t("sponsors"),
                  external: false,
                  buttonVariant: "secondary",
                },
              ] as const
            ).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full sm:w-auto"
                {...(item.external
                  ? { target: "_blank" as const, rel: "noopener noreferrer" }
                  : {})}
              >
                <Button
                  type="button"
                  variant={item.buttonVariant}
                  size="lg"
                  className={
                    item.buttonVariant === "default"
                      ? "w-full rounded-full px-8 sm:w-auto"
                      : "w-full rounded-full border border-primary-500 bg-white px-8 text-primary-500 hover:bg-primary-500/10 sm:w-auto"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* hero img */}
        <div className="mt-12 min-h-0 flex-1">
          <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden rounded-lg">
            <Image
              src="https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/FF26_Hero_Banner_2_jji2v8.webp"
              alt={t("imageAlt")}
              priority
              fill
              sizes="100vw"
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
