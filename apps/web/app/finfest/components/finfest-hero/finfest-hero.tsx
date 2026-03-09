import Image from "next/image";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { FinfestHeroImg } from "@/assets";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";

export const FinfestHero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* patterns */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-24 opacity-70 sm:left-[-80px] md:left-0 md:top-0">
          <FinfestHeroPattern />
        </div>

        <div className="absolute right-[-120px] top-24 scale-x-[-1] opacity-60 sm:right-[-80px] md:right-0 md:top-0">
          <FinfestHeroPattern />
        </div>
      </div>

      <ComponentLayout className="relative pt-16 pb-12 md:pb-16">
        {/* text */}
        <div className="mx-auto  text-center">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl md:text-4xl lg:text-[42px]">
            FinFE$T financial festival for everyone
          </h1>

          <p className="mt-4 max-w-[720px]  text-center mx-auto text-sm md:text-base lg:text-lg text-neutral-900 leading-[130%]">
            Learn how to make, manage, and build wealth from industry
            professionals. Join our free community event designed to empower
            your financial future.
          </p>

          <div className="mt-6 flex justify-center">
            <Button variant="default" size="lg" className="rounded-full px-8">
              Register now
            </Button>
          </div>
        </div>

        {/* hero img */}
        <div className="mt-12">
          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src={FinfestHeroImg}
              alt="FinFest Financial Festival"
              priority
              className="w-full h-[320px] md:h-[420px] lg:h-[485px] object-cover"
            />
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
