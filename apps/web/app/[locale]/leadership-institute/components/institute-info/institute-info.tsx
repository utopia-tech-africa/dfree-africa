import { getTranslations } from "next-intl/server";
import { CampaignsResultsPattern } from "@/assets";
import ComponentLayout from "@/components/component-layout";

export const InstituteInfo = async () => {
  const t = await getTranslations("leadershipInstitute.instituteInfo");

  const instituteInfoItems = [
    {
      id: "info1",
      label: t("info1.label"),
      title: t("info1.title"),
      description: t("info1.description"),
    },
    {
      id: "info2",
      label: t("info2.label"),
      title: t("info2.title"),
      description: t("info2.description"),
    },
    {
      id: "info3",
      label: t("info3.label"),
      title: t("info3.title"),
      description: t("info3.description"),
    },
  ];

  return (
    <div className="relative bg-primary-500 py-12 my-10 overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <CampaignsResultsPattern />
      </div>

      <div className="absolute inset-0 z-0 rotate-180 pointer-events-none opacity-60">
        <CampaignsResultsPattern />
      </div>

      {/* Content */}
      <ComponentLayout className="relative z-10 w-full flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between items-center">
          {instituteInfoItems.map((info) => (
            <div
              key={info.id}
              className="flex-1 gap-2 max-w-90 mx-auto text-center py-2 md:py-3 px-2"
            >
              <span className="md:mb-1 block text-white text-[60px] lg:text-[46px] font-bold uppercase font-montserrat">
                {info.label}
              </span>

              <h3 className="mb-2 text-xl sm:text-2xl lg:text-[26px] font-bold text-white font-montserrat">
                {info.title}
              </h3>

              <p className="text-sm sm:text-base lg:text-lg leading-tight text-neutral-100 font-poppins">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </ComponentLayout>
    </div>
  );
};
