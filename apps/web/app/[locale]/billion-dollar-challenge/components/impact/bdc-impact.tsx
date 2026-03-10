import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { BDCImpactPattern } from "@/assets/svg";

export function BDCImpact() {
  const amount = "$21,937,662";

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-24 bg-primary-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={BDCImpactPattern}
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <section className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-12">
        <ComponentLayout>
          <div className="space-y-2 md:space-y-4">
            <Title text="Impact so far" className="text-neutral-100" />
            <Subtitle
              text="Debt paid off to date"
              className="text-neutral-100"
            />
          </div>
        </ComponentLayout>
        {/* Counter Container - Full Width Borders */}
        <div className="w-full border-y border-primary-300 flex justify-center overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap justify-center max-w-full">
            {(amount.match(/\d,?|./g) || []).map((char, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-10 h-12 sm:min-w-16 sm:h-24 md:min-w-20 md:h-32 lg:min-w-28 lg:h-44 px-2 sm:px-3 bg-primary-600/30 text-white border border-primary-300 shadow-sm"
              >
                <span className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold font-montserrat">
                  {char}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-lg sm:text-[32px] sm:font-bold text-neutral-100 font-montserrat max-w-[800px]">
          Real people achieving real financial freedom together.
        </p>
      </section>
    </section>
  );
}
