import React from "react";
import Image from "next/image";
import {
  BDCPartnersLogo1,
  BDCPartnersLogo2,
  BDCPartnersLogo3,
  BDCPartnersLogo4,
  BDCPartnersLogo5,
  BDCPartnersLogo6,
} from "@/assets/img";
import ComponentLayout from "@/components/component-layout";

const logos = [
  BDCPartnersLogo1,
  BDCPartnersLogo2,
  BDCPartnersLogo3,
  BDCPartnersLogo4,
  BDCPartnersLogo5,
  BDCPartnersLogo6,
];

export const Partners = () => {
  return (
    <section className="w-full my-24 ">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        {/* Green Header Block */}
        <div className="bg-primary-400 p-8 md:p-12 lg:p-16 flex items-center justify-center md:justify-start w-full md:w-[45%] lg:w-[40%] xl:w-[35%] shrink-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.2] font-montserrat text-left w-full">
            Community & <br /> Institutional Partners
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
                alt={`Partner Logo ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
