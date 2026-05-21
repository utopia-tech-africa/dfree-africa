import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Title } from "@/components/title-and-subtitle/title";
import { getTranslations } from "next-intl/server";
import { BoardOfDirectors, Filings, Staff } from "./components";

const LeadershipPage = async () => {
  const t = await getTranslations("home.leadership");

  return (
    <ComponentLayout className="mb-20 mt-24 space-y-14">
      <div className="text-center">
        <Title text={t("title")} className="mb-2" />
        <Subtitle text={t("subtitle")} />
      </div>
      <BoardOfDirectors />
      <Staff />
      <Filings />
    </ComponentLayout>
  );
};

export default LeadershipPage;
