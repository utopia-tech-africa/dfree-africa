import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const logos = [
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo1.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo2.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo3.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo4.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo5.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Logo6.webp",
];

export const Partners = async () => {
  const t = await getTranslations("bdc.partners");
  return (
    <section className="w-full my-24">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        {/* Green Header Block */}
        <div className="bg-primary-400 p-8 md:p-12 lg:p-16 flex items-center justify-center md:justify-start w-full md:w-[45%] lg:w-[40%] xl:w-[35%] shrink-0">
          <h2 className="text-4xl md:text-[60px] lg:text-[70px] font-bold text-white leading-[1.2] font-montserrat text-left w-full whitespace-pre-line">
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
                sizes="(max-width: 640px) 50vw, 200px"
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
