import ComponentLayout from "@/components/component-layout";
import { getTranslations } from "next-intl/server";

const FinfestExperience = async () => {
  const t = await getTranslations("finfest.experience");

  return (
    <ComponentLayout className="flex flex-col md:items-center md:justify-center gap-6 md:text-center my-20 ">
      <h2 className="font-bold text-[38px] font-montserrat">
        {t.rich("title", {
          primary: (chunks) => (
            <span className="text-primary-500">{chunks}</span>
          ),
        })}
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center text-left">
        <p className="font-poppins text-neutral-900 text-lg  leading-[120%]">
          {t("paragraph1")}
        </p>
        <p className="font-poppins text-neutral-900 text-lg  leading-[120%]">
          {t("paragraph2")}
        </p>
      </div>
    </ComponentLayout>
  );
};

export default FinfestExperience;
