import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HomeHero = async () => {
  const t = await getTranslations("home.hero");

  return (
    <section className="relative w-full h-dvh flex items-end overflow-hidden mb-7.5 md:mb-12 lg:mb-23">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/vid/home-hero-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-20 pb-16.5 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-8">
        <div className="w-full lg:max-w-180 flex flex-col items-start gap-4 lg:gap-8 text-left">
          <h1 className="text-white text-3xl lg:text-[56px] font-bold leading-[110%] lg:leading-[100%] font-montserrat max-w-180">
            {t("title")}
          </h1>

          <p className="text-white text-sm sm:text-base lg:text-lg font-light leading-[140%] lg:leading-[130%] font-poppins max-w-160">
            {t("subtitle")}
          </p>

          <div className="flex flex-row items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link href="#pillars-section" className="flex-1 sm:flex-none">
              <Button
                size="lg"
                className="w-full px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 text-white text-xs sm:text-sm lg:text-base font-medium"
              >
                {t("discoverMoreCta")}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            <Link
              href="https://www.zeffy.com/en-US/donation-form/general-donations-101"
              target="_blank"
            >
              <Button
                size="lg"
                className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-full bg-white/29 backdrop-blur-[10px] border border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm lg:text-base font-medium flex-1 sm:flex-none"
              >
                {t("donateNowCta")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center relative shrink-0">
          <div className="relative w-70 h-70 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#537034] bg-white/20 backdrop-blur-[10px]" />

            {/* curved text */}
            <svg
              viewBox="0 0 280 280"
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            >
              <defs>
                {/* centered top half arc inside circle */}
                <path
                  id="topArc"
                  d="M 35 140 A 105 105 0 0 1 245 140"
                  fill="none"
                />
              </defs>

              <text
                fill="#ffffff"
                fontSize="20"
                letterSpacing="4"
                fontWeight="700"
                fontFamily="montserrat"
              >
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  {t("freshOffThePress")}
                </textPath>
              </text>
            </svg>

            <div className="relative z-10 mt-8">
              <Image
                src={
                  "https://res.cloudinary.com/dan9camhs/image/upload/v1773225508/22c51328-5a60-4b0b-9281-53025c2bc8b8.webp"
                }
                width={108}
                height={140}
                alt="Book"
                className="drop-shadow-2xl -rotate-2deg"
                priority
              />
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
              <Link href={"https://store.dfree.com/"} target="_blank">
                <Button
                  size="lg"
                  className="hover-bg-primary-600 px-12 py-6 font-poppins font-medium text-lg"
                >
                  {t("buyNowCta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
