import { HandCoins, PiggyBank, TrendingUp } from "lucide-react";
import { FinfestObjectivePattern } from "@/assets";
import ComponentLayout from "@/components/component-layout";

const OBJECTIVE_CONTENT = [
  {
    icon: HandCoins,
    title: "How to make Money",
    description:
      "Discover proven methods to increase your income and create multiple revenue streams.",
  },
  {
    icon: PiggyBank,
    title: "Money Management",
    description:
      "Take control of your money through smart decisions and habits that actually stick.",
  },
  {
    icon: TrendingUp,
    title: "How to build Wealth",
    description: "Turn your earnings into assets that work for you over time.",
  },
] as const;

export const FinfestObjective = () => {
  return (
    <ComponentLayout className="relative overflow-hidden bg-primary-500 py-10">
      <div className="absolute top-0 bottom-0 -left-50 md:-left-20 w-full h-full pointer-events-none">
        <FinfestObjectivePattern />
        <FinfestObjectivePattern />
      </div>

      <div className="relative z-10">
        <div className="max-w-160">
          <h2 className="text-white text-2xl md:text-3xl lg:text-[36px] font-bold font-montserrat">
            The FinFE$T Objective
          </h2>

          <p className="text-neutral-300 mt-4 text-base md:text-lg leading-1.3">
            FinFE$T empowers you to take actionable steps towards the path to
            financial freedom by providing content, curriculum, training, and
            tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-14">
          {OBJECTIVE_CONTENT.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="text-white">
                <Icon className="w-10 h-10 text-white mb-6" />

                <h3 className="text-xl md:text-2xl lg:text-[32px] text-neutral-100 font-bold font-montserrat mb-3">
                  {item.title}
                </h3>

                <p className="text-neutral-300 text-base md:text-lg leading-1.3">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ComponentLayout>
  );
};
