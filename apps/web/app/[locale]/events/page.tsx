import { Events } from "@/app/components/events";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { getTranslations } from "next-intl/server";

const EventsPage = async () => {
  const t = await getTranslations("home.events");

  return (
    <div className="flex flex-col my-20 lg:my-20">
      <ComponentLayout className="flex flex-col items-center text-center mb-10">
        <Subtitle text={t("pageTitle")} />
        <p className="text-neutral-600 mt-4">{t("sublabel")}</p>
      </ComponentLayout>
      <Events showHeader={false} layout="grid" />
    </div>
  );
};

export default EventsPage;
