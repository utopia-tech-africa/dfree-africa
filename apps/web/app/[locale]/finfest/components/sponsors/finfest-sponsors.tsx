import React from "react";
import Image from "next/image";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FinfestSponsors = () => {
  const sponsors = [
    {
      name: "Independence Realty Trust",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773238090/7ed995e5-39e3-45e5-be98-a40662f863ff.webp",
    },

    {
      name: "NJIDA",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773238298/f53b1159-3f54-4190-9f15-776464abe2da.webp",
    },
    {
      name: "Prudential",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773238234/d1570521-d65f-4a54-a455-12f3008bffff.webp",
    },
    {
      name: "Valley",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773238528/0546e2fb-6d47-4aa7-a155-23490c97d75f.webp",
    },
    {
      name: "RWJBarnabas Health",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773238376/41f22c93-268a-4c2b-9c77-f51339179b35.webp",
    },

    {
      name: "Onity",
      logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773237529/76b925f2-45d4-4a87-9306-775dcf55f686.webp",
    },
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
              {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  key={`first-${index}`}
                  className="h-12 md:h-16 flex items-center justify-center min-w-[140px] md:min-w-[200px]"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    height={500}
                    width={500}
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
