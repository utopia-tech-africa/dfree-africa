import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { ASCWhatsCoveredImg1, ASCWhatsCoveredImg2 } from "@/assets/img";

export const ASCWhatsCovered = () => {
  const cards = [
    {
      title: "Program Access",
      image: ASCWhatsCoveredImg1,
      bullets: [
        "DFREE® Wealth Lab",
        "DFREE® Community",
        "DFREE® Coaching cohorts",
        "DFREE® 12 Steps to Financial Freedom",
        "DFREE® Certification for leaders and facilitators",
      ],
    },
    {
      title: "Event Participation",
      image: ASCWhatsCoveredImg2,
      bullets: [
        "Registration fees",
        "Workbooks and materials",
        "Technology access (as needed)",
      ],
    },
  ];

  return (
    <section className="py-12 md:py-20  bg-white">
      <ComponentLayout className="space-y-2 md:space-y-6">
        <div className="text-center">
          <Subtitle text="What's covered" className="text-neutral-1000" />
          <p className="text-base md:text-lg text-neutral-800 font-poppins max-w-[700px] mx-auto">
            Get total access to courses, expert coaching, and our thriving
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group h-[400px] md:h-[420px] w-full md:w-[620px]  rounded-md overflow-hidden shadow-lg"
            >
              {/* Card Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 text-white">
                <h3 className="text-2xl md:text-2xl font-bold font-montserrat mb-2 md:mb-4 leading-tight">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm md:text-base font-poppins opacity-90"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ComponentLayout>
    </section>
  );
};
