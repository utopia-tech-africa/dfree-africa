import { getTranslations } from "next-intl/server";
import { CampaignsResultsPattern } from "@/assets";
import ComponentLayout from "@/components/component-layout";

const RESULTS_SUBTEXT_KEYS = [
  "grassroots",
  "habitsTakeRoot",
  "economicStrength",
] as const;

export const CampaignsResults = async () => {
  const t = await getTranslations("communityCampaigns.results");

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
              {t("title")}
            </h4>

            <h1 className="font-montserrat text-neutral-100 text-2xl md:text-4xl lg:text-[46px] font-bold leading-[120%]">
              {t("subtitle")}
            </h1>

            <p className="text-neutral-200 font-poppins max text-base md:text-lg leading-[130%]">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-stretch md:justify-between">
            {RESULTS_SUBTEXT_KEYS.map((key, index) => (
              <div
                key={key}
                className={`
                flex flex-col gap-6 
                py-6 md:py-0
                md:px-8
                ${index !== RESULTS_SUBTEXT_KEYS.length - 1 ? "md:border-r md:border-neutral-300/30" : ""}
              `}
              >
                <h3 className="text-lg md:text-xl lg:text-[26px] text-neutral-100 font-montserrat">
                  {t(`subtexts.${key}.text`)}
                </h3>

                <p className="text-neutral-200 font-poppins leading-[130%] text-base md:text-lg">
                  {t(`subtexts.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
};
