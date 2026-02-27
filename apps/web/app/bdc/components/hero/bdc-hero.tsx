import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BDCHeroImg } from "@/assets/img";
import ComponentLayout from "@/components/component-layout";

const HERO_CONTENT = {
  title: (
    <>
      DFREE<sup>®</sup> Billion Dollar Challenge
    </>
  ),
  subtitle:
    "Eliminate debt, build savings, and take control of your financial future through a digital platform built on community accountability.",
  cta: {
    label: "Join BDC today",
    href: "#",
  },
};

export default function BDCHero() {
  return (
    <section className="relative w-full min-h-150 h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={BDCHeroImg}
          alt="BDC Hero background"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[#000000]/60" aria-hidden />

      <ComponentLayout className="w-full h-full z-10 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="w-full text-start">
          <div className="max-w-[90%] xs:max-w-[400px] sm:max-w-125 md:max-w-150 lg:max-w-190">
            <h1 className="font-montserrat mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bold leading-[1.2] text-white">
              {HERO_CONTENT.title}
            </h1>

            <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white font-poppins font-normal max-w-[600px]">
              {HERO_CONTENT.subtitle}
            </p>

            <Link
              href={HERO_CONTENT.cta.href}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-sm sm:text-base inline-flex",
              )}
            >
              {HERO_CONTENT.cta.label}
            </Link>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
