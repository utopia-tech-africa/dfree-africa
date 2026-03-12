import React from "react";
import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

const audiences = [
  {
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773227325/b5c5a330-0e6a-4df9-bc29-8e8ba8161896.webp",
    label: "Solo",
    title: "Take control of your financial story.",
  },
  {
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773227411/image_qqjpk7.webp",
    label: "As a group",
    title: "Peers seeking financial growth.",
  },
  {
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773227517/image_1_o8rgbx.webp",
    label: "Communities",
    title: "Build this movement in your region.",
  },
];

export default function Audience() {
  return (
    <ComponentLayout className="flex flex-col items-center text-center space-y-4 md:space-y-6">
      <div className="space-y-1 max-w-[800px]">
        <Title text="Audience" />
        <Subtitle text="This challenge is for all." />
        <p className="text-sm md:text-base lg:text-lg text-neutral-1000">
          Whether you're starting from scratch or pushing toward the finish
          line, there's a place for you here.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full pt-2 md:pt-4 h-auto md:h-[500px]">
        {audiences.map((audience, index) => (
          <div
            key={index}
            className="relative aspect-4/5 md:aspect-auto w-full h-full overflow-hidden rounded-md group transition-all duration-700 ease-in-out md:flex-1 md:hover:flex-[1.5]"
          >
            <Image
              src={audience.image}
              alt={audience.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-left space-y-2 w-full">
              <span className="text-base font-medium text-white/80">
                {audience.label}
              </span>
              <h4 className="text-2xl font-bold text-white font-montserrat leading-tight line-clamp-2">
                {audience.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </ComponentLayout>
  );
}
