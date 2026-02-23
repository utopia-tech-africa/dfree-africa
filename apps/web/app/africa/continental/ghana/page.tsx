import { GhanaPageBg } from "@/assets";
import { Hero, PageInfo } from "../components";
import { SectionCard } from "../components/section-card";
import { SectionCardProps } from "../components";
import { cn } from "@/lib/utils";

const ghanaPageData: SectionCardProps = [
  {
    title: "DFREE®IN THE WORKPLACE",
    description: `The DFREE® program was  piloted in Ghana within an organization where workplace loans were  common practice.  Without a cap on borrowing power of employees,  employers capitalized on this practice to leave most employees in wage  deficit at the end of the pay cycle.
                  Under the leadership of  Mark, several staff of the organization joined the club and set  individual as well as communal goals to pay off debt using such  strategies such as the snowball method taught in the program. This  kicked off and spiraled into a campaign even without the participants’  access to workbooks.
                  More importantly, they  formed a support group that motivated and encouraged one another by  sharing success stories and personal approaches to self-discipline.  In  short, a lifestyle and mindset change around money and spending was  born.`,
  },
  {
    title: "DFREE® IN THE CHURCH",
    description: `The DFREE® program was  piloted in Ghana within an organization where workplace loans were  common practice.  Without a cap on borrowing power of employees,  employers capitalized on this practice to leave most employees in wage  deficit at the end of the pay cycle.
                  Under the leadership of  Mark, several staff of the organization joined the club and set  individual as well as communal goals to pay off debt using such  strategies such as the snowball method taught in the program. This  kicked off and spiraled into a campaign even without the participants’  access to workbooks.
                  More importantly, they  formed a support group that motivated and encouraged one another by  sharing success stories and personal approaches to self-discipline.  In  short, a lifestyle and mindset change around money and spending was  born.`,
  },
  {
    title: "PARTNERSHIPS",
    description: `DFREE® Club, Ghana has partnered with Gamma Alpha Sigma Zeta chapter of Zeta Phi Beta Sorority, Inc. (A.K.A. Ghana Zetas) to promote financial literary among specific groups of  consumers.  This mostly includes women and girls in shelters and halfway homes often rescued or escaping from abusive homes. They also work with fisherfolks and farmers in rural communities, and street hawkers in  urban areas.
                  Working through the Agape  Sanctuary of Victory Bible Church, the engagement of youth in the BDC  and outreach to market traders have been extremely successful campaigns  that can only group through other sanctuaries of the church.`,
  },
  {
    title: "CHALLENGES",
    description: `DFREE® Club, Ghana has  struggled with sustainability over the years.  Funding for travel,  access to resources like books and internet service are some of the  factors affecting the few volunteers who have committed to driving the  cause. 
                  In this new phase, the  emphasis on working through the church, hopefully, changes the  narrative.  Support in the form of books and funding to host events,  educate market traders and reach more beneficiaries would be welcome.`,
  },
  {
    title: "SUCESSES",
    description: `DFREE® Club, Ghana has  chalked some successes.  Over 100 individuals have successfully  completed the program since inception. Apart from the debt paid down,  group members have also saved over 60,000 cedis ($8,000) collectively in about 3 years through the Billion Dollar Challenge.
                  The Club continues to lead  the charge of helping individuals pay down debt, save to create wealth,  and learn to invest and grow their incomes for better standards of  living.`,
  },
];

const GhanaPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Hero bgImage={GhanaPageBg} />

      <PageInfo
        mainTitle="DFREE® in Ghana"
        descTitle="About"
        descText="To mark the 10th anniversary of his first visit to Ghana, Dr. Soaries was enstooled a chief by His Majesty the King of Akyem Abuakwa, in recognition of his work towards development throughout the kingdom and the country. As Nkosuorhene (chief of development), he continues to drive projects that directly address community especially in education and livelihoods for children and youth."
      />

      {ghanaPageData.map((data: SectionCardProps[number], index: number) => {
        const isLast = index % 2 === 0;

        const className = `${isLast ? "bg-primary-500 text-neutral-100" : ""}`;

        return (
          <div className={cn(className, "")} key={index}>
            <SectionCard title={data.title} description={data.description} />
          </div>
        );
      })}
    </div>
  );
};
export default GhanaPage;
