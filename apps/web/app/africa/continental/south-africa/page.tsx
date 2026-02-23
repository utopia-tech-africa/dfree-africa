import { SouthAfricaPageBg } from "@/assets";
import { Hero, PageInfo } from "../components";
import { SectionCard } from "../components/section-card";
import { SectionCardProps } from "../components";
import { cn } from "@/lib/utils";

const southAfricaPageData: SectionCardProps = [
  {
    title: "PARTNERSHIPS",
    description: `Karani Leadership – This is a successful black-owned company offering business and strengths  coaching for entrepreneurs, and executive coaching for senior  management. The partnership gave birth to the incorporation of a 4-week  DFREE® course in their entrepreneurs’ program. 
Lucha Lunako – dfree® South Africa teamed up this prominent youth development not-for-profit  organization to enhance their Financial Behavior Improvement division,  drawing from the DFREE® Young Money curriculum.
Pastor Debbie Bruce and the Baptist Convention of Southern Africa (BCSA) – Ps. Bruce is the vice president of the Convention who has fostered a  relationship to train pastors and church leaders in the Convention.  Through the partnership, train-the-trainer sessions are also held for  George East Ministers Fraternity so they can in turn train other leaders to launch the dfree® program in their churches.`,
  },
  {
    title: "CHALLENGES",
    description: `In-person trainings were  curtailed due to the COVID-19 lockdown and restrictions imposed by  government, which limited the number of people and the duration of each  gathering.
Financial constraints of participants due to the high rate of job losses in 2020/2021 meant that people had competing necessities on their stimulus income government.  Internet service was not a priority on the needs list, which meant  attendance was low on our virtual meetings.  Sadly, those most affected  were also the bracket of people highly indebted to loan sharks and  retail shops.`,
  },
  {
    title: "SUCESSES",
    description: `Some notable milestones achieved by  DFREE® South Africa include starting savings clubs, nurturing  subsistence entrepreneurs and cooperatives in underserved South African  communities that have emerged. We believe in continued and extensive  behavioral financial literacy research.`,
  },
];

const SouthAfricaPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Hero bgImage={SouthAfricaPageBg} />

      <PageInfo
        mainTitle="DFREE® in South Africa"
        descText="“Our lives continue to be  blessed by the work we do at DFREE®. It is an honor we cherish greatly  that God can use us for such a big mandate of helping people live in  financial freedom.”
                  Landi and Mali, DFREE® SA. "
      />

      {southAfricaPageData.map(
        (data: SectionCardProps[number], index: number) => {
          const isLast = index % 2 === 0;

          const className = `${isLast ? "bg-primary-500 text-neutral-100" : ""}`;

          return (
            <div className={cn(className, "")} key={index}>
              <SectionCard title={data.title} description={data.description} />
            </div>
          );
        },
      )}
    </div>
  );
};
export default SouthAfricaPage;
