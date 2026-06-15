import { DonateHeroPattern } from "@/assets/svg";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import { DonationForm } from "./donation-form";

export function DonateHero() {
  return (
    <section
      className={cn(
        "relative  flex min-h-[calc(100dvh-4rem-2.5rem)] flex-col overflow-hidden sm:rounded-2xl md:m-5 bg-primary-500",
        "md:min-h-[calc(100dvh-4.5rem-2.5rem)]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex h-[min(55%,24rem)] justify-center overflow-hidden opacity-80"
        aria-hidden
      >
        <DonateHeroPattern />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[min(55%,24rem)] justify-center overflow-hidden opacity-80"
        aria-hidden
      >
        <DonateHeroPattern className="rotate-180" />
      </div>

      <ComponentLayout className="relative z-10 flex flex-1 flex-col justify-center py-10 md:py-14 lg:py-16">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="mx-auto space-y-4 text-center text-white lg:mx-0 lg:text-left">
            <p className="font-montserrat text-base lg:text-lg font-bold text-neutral-100">
              Donate to the movement
            </p>

            <h1 className="font-montserrat text-3xl font-bold leading-[1.2] md:text-5xl ">
              Small acts of kindness create big change.
            </h1>

            <p className="font-poppins text-base leading-relaxed text-neutral-200 md:text-lg lg:text-xl">
              Join us in amplifying vital voices and delivering direct support
              to communities building a more equitable future.
            </p>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <DonationForm />
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
