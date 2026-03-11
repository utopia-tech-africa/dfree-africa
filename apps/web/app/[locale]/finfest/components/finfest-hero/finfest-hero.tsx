import Image from "next/image";
import { FinfestHeroPattern } from "@/assets/svg/finfest-hero-pattern";
import { Button } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";

export const FinfestHero = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* patterns */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-24 opacity-70 sm:left-[-80px] md:left-0 md:top-0">
          <FinfestHeroPattern />
        </div>

        <div className="absolute right-[-120px] top-24 scale-x-[-1] opacity-60 sm:right-[-80px] md:right-0 md:top-0">
          <FinfestHeroPattern />
        </div>
      </div>

      <ComponentLayout className="relative flex flex-1 flex-col pt-16 pb-12 md:pb-16">
        {/* text - takes only what it needs */}
        <div className="mx-auto shrink-0 text-center">
          <h1 className="font-montserrat leading-[120%] font-bold text-neutral-1000 text-3xl md:text-4xl lg:text-[42px]">
            FinFE$T financial festival for everyone
          </h1>

          <p className="mt-4 max-w-[720px] mx-auto text-center text-sm leading-[130%] text-neutral-900 md:text-base lg:text-lg">
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

        {/* hero img - takes the rest of the height */}
        <div className="mt-12 min-h-0 flex-1">
          <div className=" w-full overflow-hidden rounded-lg">
            <Image
              src={
                "https://res.cloudinary.com/dan9camhs/image/upload/v1773236329/7d47e665-0efa-4358-9b62-3ce55a050c4d.webp"
              }
              height={600}
              width={900}
              alt="FinFest Financial Festival"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
