import React from "react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Carousel } from "@/components/carousel";
import { Speaker, SpeakerCard } from "./components/speaker-card";

const speakers: Speaker[] = [
  {
    name: "Dr. DeForest B Soaries, Jr.",
    role: "Founder & CEO DFREE Global Foundation",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773236752/869cdac2-16f9-4207-a193-0fce5c64a4ad.webp",
  },
  {
    name: "Karen Hunter",
    role: "CEO & Founder of Knarrative LLC",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773236878/fa2c510f-e63b-4d49-b7b5-3f73e9ce8856.webp",
  },
  {
    name: "Jackie P. Taylor",
    role: "Founder & CEO Boost Strategy Group, Inc.",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773237122/04794f23-50ff-4dae-a71e-cc48fced1b14.webp",
  },
  {
    name: 'Tiffany "The Budgetnista" Aliche',
    role: "Award-Winning Author Financial Educator",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773237205/d6f55e6e-3177-4f6f-b752-c445f0ca14c9.webp",
  },
  {
    name: "Deborah Reynolds",
    role: "Founder of Future Moguls Investment Community",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773237378/c4bcb585-6d00-4c2e-9072-2204ec1bf230.webp",
  },
];

export const FinfestPastSpeakers = () => {
  return (
    <section className="bg-white overflow-hidden">
      <ComponentLayout className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-2 ">
          <Title text="Past Speakers" />
          <Subtitle text="Learn from the experts" />
          <p className="text-base md:text-lg text-neutral-900 font-poppins opacity-80">
            These professionals have shaped conversations around financial
            freedom and shared their knowledge at FinFe$T
          </p>
        </div>

        {/* Carousel Slider with right bleed */}
        <Carousel slideClassName="w-[300px]">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </Carousel>
      </ComponentLayout>
    </section>
  );
};
