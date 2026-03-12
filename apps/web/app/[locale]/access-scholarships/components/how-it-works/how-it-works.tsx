import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { ASCHowItWorksPattern } from "@/assets/svg";
import {
  PiBookOpenText,
  PiCertificate,
  PiClipboardTextLight,
  PiListChecks,
} from "react-icons/pi";

export const AscHowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Apply",
      description:
        "Submit a brief application outlining your financial need and goals for the programme.",
      icon: <PiClipboardTextLight className="size-8" />,
    },
    {
      number: "2",
      title: "Review",
      description:
        "DFREE® staff or partner organisations review applications using a standardised rubric.",
      icon: <PiListChecks className="size-8" />,
    },
    {
      number: "3",
      title: "Award",
      description:
        "Approved applicants receive scholarship confirmation and programme access instructions.",
      icon: <PiCertificate className="size-8" />,
    },
    {
      number: "4",
      title: "Participate",
      description:
        "Recipients complete coursework and surveys for impact measurement.",
      icon: <PiBookOpenText className="size-8" />,
    },
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden pb-12">
      <ComponentLayout className="space-y-4 md:space-y-8">
        {/* Header Content */}
        <div className="max-w-[700px] space-y-2">
          <div className="space-y-1">
            <Title text="How it works" className="text-tertiary-500" />
            <Subtitle text="A Simple, Supportive Process" />
          </div>
          <p className="text-base md:text-lg text-neutral-800 font-poppins font-normal leading-relaxed">
            A process that gets you from application to participation. Four
            straightforward steps guide you toward financial freedom.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-primary-500  p-4 rounded-xl relative overflow-hidden flex flex-col space-y-3 group hover:translate-y-[-4px] transition-all duration-300"
            >
              {/* Large Faded Number */}
              <span className="absolute top-4 right-4 text-8xl font-bold select-none font-montserrat bg-linear-to-t from-primary-300 to-transparent bg-clip-text text-transparent">
                {step.number}
              </span>

              {/* Icon */}
              <div className="text-white relative z-10">{step.icon}</div>

              {/* Text Content */}
              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-bold text-white font-montserrat">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 font-poppins leading-tight">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ComponentLayout>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none">
        <Image
          src={ASCHowItWorksPattern}
          alt="Background grid pattern"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </section>
  );
};
