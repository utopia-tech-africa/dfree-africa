import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AccessSholarshipsHeroImg } from "@/assets/img";
import ComponentLayout from "@/components/component-layout";

const HERO_CONTENT = {
  title: "Unlock Your Financial Freedom Journey",
  subtitle:
    "The DFREE® Access Scholarship offers free access to courses, materials, coaching, and events, helping participants achieve financial stability and empowerment.",
  actions: [
    {
      label: "Apply for Scholarship",
      href: "#",
      variant: "default" as const,
    },
    {
      label: "Become a Sponsor",
      href: "#",
      variant: "ghost" as const,
    },
  ],
};

export function AccessSholarshipsHero() {
  return (
    <section className="relative w-full min-h-150 h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={AccessSholarshipsHeroImg}
          alt="Access Scholarships Hero background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[#000000]/50" aria-hidden />

      <ComponentLayout className="w-full h-full z-10 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="w-full text-start">
          <div className="max-w-[90%] xs:max-w-[400px] sm:max-w-125 md:max-w-150 lg:max-w-190">
            <h1 className="font-montserrat mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bold leading-[1.2] text-white">
              {HERO_CONTENT.title}
            </h1>

            <p className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white font-poppins font-normal max-w-[700px]">
              {HERO_CONTENT.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              {HERO_CONTENT.actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={cn(
                    buttonVariants({ variant: action.variant, size: "lg" }),
                    "text-sm sm:text-base inline-flex",
                  )}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
