import Image from "next/image";
import { ASCAccessibiltyImg, DfreeLogoBg } from "@/assets/img";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";

export const ASCAccessibilty = () => {
  const criteria = [
    "Financial need or hardship",
    "Commitment to completing DFREE® coursework",
    "Desire to improve financial habits and reduce debt",
    "Individual enrollment into the DFREE® Community Digital Hub",
    "Enrollment through a partner organization (church, nonprofit, employer, school)",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Watermark */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none select-none">
        <Image
          src={DfreeLogoBg}
          alt="DFREE Pattern Background"
          fill
          className="object-contain"
          priority
        />
      </div>

      <ComponentLayout className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12  items-center">
          {/* Left Content */}
          <div className="flex flex-col">
            <div className="space-y-4">
              <Subtitle
                text="Who can apply for the scholarship"
                className="leading-tight"
              />
            </div>

            <p className="text-base my-4 text-neutral-800 font-poppins font-medium">
              Designed for All Individuals Ready to Transform Their Financial
              Future
            </p>

            <ul className="space-y-4 pt-2">
              {criteria.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm md:text-base text-neutral-1000 font-poppins opacity-90"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-1000 shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button size="lg" className="px-8 py-6 text-base">
                Apply for Scholarship
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-5/4 rounded-md overflow-hidden">
            <Image
              src={ASCAccessibiltyImg}
              alt="Two women working together on a laptop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
