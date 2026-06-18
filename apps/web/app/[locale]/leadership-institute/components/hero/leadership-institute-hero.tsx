import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";

export async function LeadershipInstituteHero() {
  const t = await getTranslations("leadershipInstitute.hero");
  return (
    <section className="relative w-screen min-h-150 h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0 w-screen h-full">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1779208610/2f33799cdd21cb3fee9df9129592cc467e474777_draubv.webp"
          }
          alt={t("imageAlt")}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50" aria-hidden />

      <ComponentLayout className="w-full h-full z-10 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="w-full text-start">
          <div className="max-w-[90%] xs:max-w-[400px] sm:max-w-125 md:max-w-150 lg:max-w-190">
            <h4 className="font-montserrat mb-2 sm:mb-3 text-sm md:text-lg font-normal md:font-bold leading-[1.2] text-neutral-100">
              {t("preTitle")}
            </h4>

            <h1 className="font-montserrat mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bold leading-[1.2] text-white">
              {t("title")}
            </h1>

            <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white font-poppins font-normal max-w-[700px]">
              {t("subtitle")}
            </p>

            <div className="flex flex-row items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/leadership-institute/apply"
                className="flex-1 sm:flex-none"
              >
                <Button
                  size="lg"
                  className="w-full px-2 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 text-white text-xs sm:text-sm lg:text-base font-medium"
                >
                  {t("applyCta")}
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button
                  size="lg"
                  className="px-2 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-full bg-white/29 backdrop-blur-[10px] border border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm lg:text-base font-medium flex-1 sm:flex-none"
                >
                  {t("sponsorCta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
