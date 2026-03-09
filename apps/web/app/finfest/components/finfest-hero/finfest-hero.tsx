import Image from "next/image";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { FinfestHeroImg } from "@/assets";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";

export const FinfestHero = () => {
  return (
    <div className="relative overflow-hidden my-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-30 top-30 opacity-70 sm:-left-20 md:left-0 md:top-0 overflow-hidden">
          <FinfestHeroPattern />
        </div>

        <div className="absolute -right-30 top-30 scale-x-[-1] opacity-60 sm:-right-20 md:right-0 md:top-0">
          <FinfestHeroPattern />
        </div>
      </div>

      <ComponentLayout className="relative pt-16 pb-12 md:pb-16">
        <div className="mx-auto  text-center">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl md:text-4xl lg:text-[42px]">
            FinFE$T financial festival for everyone
          </h1>

          <p className="mt-1 max-w-180  text-center mx-auto text-sm md:text-base lg:text-lg text-neutral-900 leading-[130%]">
            Learn how to make, manage, and build wealth from industry
            professionals. Join our free community event designed to empower
            your financial future.
          </p>

          <div className="mt-8 flex justify-center">
            <Button variant="default" size="lg" className="rounded-full px-8">
              Register now
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <div className="w-full overflow-hidden rounded-lg relative h-57.25 md:h-105 lg:h-142.5">
            <Image
              src={FinfestHeroImg}
              alt="FinFest Financial Festival"
              priority
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
