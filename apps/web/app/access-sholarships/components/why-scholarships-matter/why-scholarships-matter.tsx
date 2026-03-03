import Image from "next/image";
import { ASCWhyScholarshipsMatterImg } from "@/assets/img";
import { ASCWhyScholarshipsMatterPattern } from "@/assets/svg";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

export const WhyScholarshipsMatterSection = () => {
  const bulletPoints = [
    "Increase participation in DFREE® programming and services",
    "Support communities disproportionately impacted by debt",
    "Strengthen financial education and long-term behavior change",
    "Boost participation in the Billion Dollar Challenge",
    "Advance the mission of the DFREE® Financial Movement",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-primary-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
        {/* Left Content */}
        <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:pl-48 xl:pr-24 py-16 md:py-24">
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image
              src={ASCWhyScholarshipsMatterPattern}
              alt="Background Pattern"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-[600px] space-y-2 md:space-y-6">
            <div className="space-y-2">
              <Title text="Why Scholarships Matter?" className="text-white" />
              <Subtitle
                text="Expanding Opportunity. Strengthening Impact."
                className="text-white"
              />
            </div>

            <p className="text-base md:text-lg text-neutral-200 font-poppins font-normal leading-relaxed opacity-90">
              Scholarships enhance financial education access for those facing
              barriers, supporting communities impacted by debt.
            </p>

            <ul className="space-y-4 md:space-y-5 pt-2">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 md:gap-4 text-white font-poppins text-sm md:text-base group"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="leading-snug opacity-90 group-hover:opacity-100 transition-opacity">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[450px] lg:h-auto overflow-hidden">
          <Image
            src={ASCWhyScholarshipsMatterImg}
            alt="Person working on a laptop"
            fill
            className="object-cover object-center grayscale-20 hover:grayscale-0 transition-all duration-700 hover:scale-105"
            priority
          />
          {/* Subtle overlay for the image */}
          <div className="absolute inset-0 bg-primary-900/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
