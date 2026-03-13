import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const logos = [
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228117/01a9f7d0-d9d9-4aa5-8138-2f2ff5334e87.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228175/2ebc0b88-766e-4d69-b61b-1f84d17243f0.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228218/b3ee389a-c29e-41c1-b227-53901c434399.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228288/cc199dbd-15b7-4305-bbc3-c8c3dcc5735e.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228340/62022153-31e6-4847-a744-d7c55d4a68ff.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773228434/a0a01107-8c87-4558-9ea1-a5f89ed993a9.webp",
];

export const Partners = async () => {
  const t = await getTranslations("bdc.partners");
  return (
    <section className="w-full my-24 ">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        {/* Green Header Block */}
        <div className="bg-primary-400 p-8 md:p-12 lg:p-16 flex items-center justify-center md:justify-start w-full md:w-[45%] lg:w-[40%] xl:w-[35%] shrink-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.2] font-montserrat text-left w-full whitespace-pre-line">
            {t("title")}
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center border-l border-b border-neutral-200 last:border-r-0"
            >
              <Image
                src={logo}
                alt={`${t("logoAlt")} ${index + 1}`}
                width={500}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
