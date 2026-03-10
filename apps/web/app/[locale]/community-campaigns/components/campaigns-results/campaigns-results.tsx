import { CampaignsResultsPattern } from "@/assets";
import ComponentLayout from "@/components/component-layout";

export const CAMPAIGN_RESULTS_CONTENT = {
  title: "Results",
  subtitle: "The power of moving together",
  descirption:
    " When people act in concert, change happens fast. Communities that campaign together see real shifts in how families manage money and build futures.",
  subtexts: [
    {
      text: "Movements start at the grassroots",
      desc: "Local leaders and neighbors carry the work forward with authenticity and trust.",
    },
    {
      text: "Financial habits take root and hold",
      desc: "Weekly engagement and peer support turn knowledge into action that lasts.",
    },
    {
      text: "Economic strength spreads through neighborhoods",
      desc: "As individuals gain stability, entire communities build the foundation for shared prosperity.",
    },
  ],
} as const;

const { title, subtitle, descirption, subtexts } = CAMPAIGN_RESULTS_CONTENT;

export const CampaignsResults = () => {
  return (
    <div className="relative bg-primary-500 py-10 my-10 overflow-hidden">
      <div className="absolute top-0 bottom-0 -left-3.5">
        <CampaignsResultsPattern />
      </div>
      <div className="absolute top-0 bottom-0 -right-3.5 rotate-180">
        <CampaignsResultsPattern />
      </div>
      <ComponentLayout className=" w-full flex-col  overflow-hidden  ">
        <div className="flex flex-col gap-6 md:gap-8 relative ">
          <div className="flex flex-col gap-4 max-w-190">
            <h4 className="text-neutral-100 font-montserrat text-base font-bold leading-[150%]">
              {title}
            </h4>

            <h1 className="font-montserrat text-neutral-100 text-2xl md:text-4xl lg:text-[46px] font-bold leading-[120%]">
              {subtitle}
            </h1>

            <p className="text-neutral-200 font-poppins max text-base md:text-lg leading-[130%]">
              {descirption}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-stretch md:justify-between">
            {subtexts.map((item, index) => (
              <div
                key={index}
                className={`
                flex flex-col gap-6 
                py-6 md:py-0
                md:px-8
                ${index !== subtexts.length - 1 ? "md:border-r md:border-neutral-300/30" : ""}
              `}
              >
                <h3 className="text-lg md:text-xl lg:text-[26px] text-neutral-100 font-montserrat">
                  {item.text}
                </h3>

                <p className="text-neutral-200 font-poppins leading-[130%] text-base md:text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
