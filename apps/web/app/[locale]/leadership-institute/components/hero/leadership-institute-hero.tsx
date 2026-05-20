import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";

export async function LeadershipInstituteHero() {
  const t = await getTranslations("leadershipInstitute.hero");
  return (
    <section className="relative w-full min-h-150 h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1779208610/2f33799cdd21cb3fee9df9129592cc467e474777_draubv.webp"
          }
          alt={t("imageAlt")}
          fill
          className="object-cover"
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

            <h1 className="font-montserrat mb-2 sm:mb-3 text-3xl sm:text-[32px] md:text-4xl lg:text-[52px] xl:text-[60px] font-bold leading-[1.2] text-white">
              {t("title")}
            </h1>

            <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white font-poppins font-normal max-w-60 md:max-w-full">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "text-xs sm:text-base inline-flex flex-1 min-w-30 justify-center px-3 sm:px-4 py-6",
                )}
              >
                {t("applyCta")}
              </Link>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "text-xs sm:text-base inline-flex flex-1 min-w-30 justify-center px-3 sm:px-4 py-6",
                )}
              >
                {t("sponsorCta")}
              </Link>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
