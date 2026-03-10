import Image from "next/image";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { FinfestHeroImg } from "@/assets";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";

export const FinfestHero = () => {
  return (
    <div className="relative overflow-hidden my-20 xl:min-h-screen xl:flex xl:flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-30 top-30 opacity-70 sm:-left-20 md:left-0 md:top-0 max-w-[50vw]">
          <FinfestHeroPattern />
        </div>
        <div className="absolute -right-30 top-30 scale-x-[-1] opacity-60 sm:-right-20 md:right-0 md:top-0 max-w-[50vw]">
          <FinfestHeroPattern />
        </div>
      </div>

      <ComponentLayout className="relative pt-16 pb-12 md:pb-16">
        <div className="mx-auto text-center max-w-4xl px-4 sm:px-6">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl sm:text-4xl md:text-[40px] lg:text-[42px]">
            FinFE$T financial festival for everyone
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-900 leading-[130%]">
            Learn how to make, manage, and build wealth from industry
            professionals. Join our free community event designed to empower
            your financial future.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              variant="default"
              size="lg"
              className="rounded-full px-6 sm:px-8"
            >
              Register now
            </Button>
          </div>
        </div>

        <div className="mt-12 px-4 sm:px-6">
          <div className="w-full overflow-hidden rounded-lg relative h-56 sm:h-80 md:h-96 lg:h-123">
            <Image
              src={FinfestHeroImg}
              alt="FinFest Financial Festival"
              priority
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
