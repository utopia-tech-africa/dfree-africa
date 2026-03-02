import Image from "next/image";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { ASCAboutImg } from "@/assets/img";

export function ASCAbout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left Column: Text Content */}
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Title text="What is Access Sholarships?" />
          <Subtitle text="About the Program" />
        </div>

        <div className="space-y-4">
          <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-normal font-poppins">
            The DFREE® Access Scholarship program removes financial barriers
            that prevent individuals and families from participating in DFREE®
            financial freedom education. Access scholarships are essentially fee
            waivers or financial assistance that cover the costs of DFREE®
            programs, tools, events, and access to financial professionals.
            <br />
            Programming includes the DFREE® Online Academy, 12 Steps to
            Financial Freedom curriculum, Say Yes to No Debt books and
            workbooks, podcasts and webinars. Fee assistance is supported by
            corporate partners (or sponsors).
          </p>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-square rounded-md overflow-hidden shadow-sm">
        <Image
          src={ASCAboutImg}
          alt="About the Program"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
