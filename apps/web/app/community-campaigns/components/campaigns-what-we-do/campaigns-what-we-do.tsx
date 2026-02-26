import { CampaignsWhatWeDoImg } from "@/assets";
import ComponentLayout from "@/components/component-layout";
import Image from "next/image";

export const WHAT_WE_DO_CONTENT = {
  title: "What we do",
  items: [
    {
      title: "Unified collaboration",
      description:
        "Multiple organizations work in concert, sharing resources and learning from one another. This creates a network effect that strengthens every participant.",
    },
    {
      title: "Shared accountability",
      description:
        "Weekly touchpoints and group learning sessions keep participants engaged and motivated. Progress is celebrated together, making the journey feel less isolating.",
    },
    {
      title: "Measurable impact",
      description:
        "Campaigns track real outcomes across the community. Debt reduction, savings growth, and behavioral change become visible proof of what's possible.",
    },
  ],
} as const;

export const CampaignsWhatWeDo = () => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 my-20">
      <ComponentLayout className="py-2 bg-primary-500 lg:h-full">
        <h4 className="font-montserrat font-bold text-base md:text-lg lg:text-2xl text-neutral-100">
          {WHAT_WE_DO_CONTENT.title}
        </h4>

        <div className="flex flex-col py-6 gap-6">
          {WHAT_WE_DO_CONTENT.items.map((item, index) => (
            <div key={index}>
              <h3
                className={`font-montserrat font-bold text-lg md:text-2xl lg:text-[30px] 
                  ${index === 0 ? "text-neutral-100" : "text-neutral-400"}`}
              >
                {item.title}
              </h3>
              <p className="font-poppins text-sm md:text-base text-neutral-400 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </ComponentLayout>

      <div className="relative w-full h-75 sm:h-100 lg:h-auto lg:min-h-full">
        <Image
          src={CampaignsWhatWeDoImg}
          alt="What we do illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};
