import React from "react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Carousel } from "@/components/carousel";
import { Speaker, SpeakerCard } from "./components/speaker-card";
import {
  DrDeforestImg,
  KarenHunterImg,
  JackiePTaylorImg,
  TiffanyAlicheImg,
  DeborahReynoldsImg,
} from "@/assets/img";

const speakers: Speaker[] = [
  {
    name: "Dr. DeForest B Soaries, Jr.",
    role: "Founder & CEO DFREE Global Foundation",
    image: DrDeforestImg,
  },
  {
    name: "Karen Hunter",
    role: "CEO & Founder of Knarrative LLC",
    image: KarenHunterImg,
  },
  {
    name: "Jackie P. Taylor",
    role: "Founder & CEO Boost Strategy Group, Inc.",
    image: JackiePTaylorImg,
  },
  {
    name: 'Tiffany "The Budgetnista" Aliche',
    role: "Award-Winning Author Financial Educator",
    image: TiffanyAlicheImg,
  },
  {
    name: "Deborah Reynolds",
    role: "Founder of Future Moguls Investment Community",
    image: DeborahReynoldsImg,
  },
];

export const FinFestPastSpeakers = () => {
  return (
    <section className="py-4 bg-white overflow-hidden">
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
        <Carousel
          options={{
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            breakpoints: {
              "(min-width: 768px)": { slidesToScroll: 2 },
              "(min-width: 1024px)": { slidesToScroll: 3 },
            },
          }}
          viewportClassName="-mr-4 md:-mr-10 lg:-mr-20 xl:-mr-[50vw] overflow-hidden max-w-[1430px]"
          slideClassName="basis-[300px]"
        >
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </Carousel>
      </ComponentLayout>
    </section>
  );
};
