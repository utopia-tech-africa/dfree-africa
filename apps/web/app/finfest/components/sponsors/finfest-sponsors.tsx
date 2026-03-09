import React from "react";
import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IndependenceRealtyTrustLogo,
  PrudentialLogo,
  NJIDAlogo,
  RWJBarnabasHealthLogo,
  ValleyLogo,
  OnityLogo,
} from "@/assets/img";

export const FinfestSponsors = () => {
  const sponsors = [
    { name: "Independence Realty Trust", logo: IndependenceRealtyTrustLogo },
    { name: "Prudential", logo: PrudentialLogo },
    { name: "NJIDA", logo: NJIDAlogo },
    { name: "RWJBarnabas Health", logo: RWJBarnabasHealthLogo },
    { name: "Valley", logo: ValleyLogo },
    { name: "Onity", logo: OnityLogo },
  ];

  return (
    <section className="bg-white overflow-hidden">
      <div className="flex flex-col items-center space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2 relative w-full">
          <Title text="Our sponsors" />
          <Subtitle text="Together we've done great things" />

          {/* Decorative Gradient Line */}
          <div className="mt-6 mx-auto w-full max-w-[800px] h-[2px] bg-linear-to-r from-transparent via-primary-500/40 to-transparent" />
        </div>

        {/* Logos Marquee (Custom CSS Implementation for zero-pause continuous loop) */}
        <div className="w-full overflow-hidden cursor-default">
          <div className="flex w-fit animate-marquee py-4">
            {/* First set of logos */}
            <div className="flex flex-none items-center gap-16 px-8 md:px-16">
              {sponsors.map((sponsor, index) => (
                <div
                  key={`first-${index}`}
                  className="h-12 md:h-16 flex items-center justify-center min-w-[140px] md:min-w-[200px]"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-contain pointer-events-none px-2"
                  />
                </div>
              ))}
            </div>
            {/* Second set of logos (Identical to ensure seamless loop) */}
            <div className="flex flex-none items-center gap-16 md:gap-32 px-8 md:px-16">
              {sponsors.map((sponsor, index) => (
                <div
                  key={`second-${index}`}
                  className="h-10 md:h-14 flex items-center justify-center min-w-[140px] md:min-w-[200px]"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-contain pointer-events-none px-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-fit",
          )}
        >
          Become a sponsor
        </Link>
      </div>
    </section>
  );
};
