import React from "react";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { GoShieldCheck } from "react-icons/go";
import { PiTargetLight, PiUsersThree } from "react-icons/pi";
import { BsBarChartLine } from "react-icons/bs";

const steps = [
  {
    icon: PiUsersThree,
    title: "Build your community",
    description:
      "Save together, stay motivated, and pay off debt one step at a time.",
  },
  {
    icon: PiTargetLight,
    title: "Set your goal",
    description:
      "Set your financial goal, create a timeline, and track your progress.",
  },
  {
    icon: BsBarChartLine,
    title: "Track your progress",
    description:
      "Track progress, stay motivated, and celebrate achievements with others.",
  },
  {
    icon: GoShieldCheck,
    title: "Stay accountable",
    description:
      "Stay accountable by sharing your goals with supportive people.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2F3F1E" />
            <stop offset="100%" stopColor="#7BA54F" />
          </linearGradient>
        </defs>
      </svg>

      <ComponentLayout className="flex flex-col items-center text-center space-y-4 md:space-y-6">
        <div className="space-y-2 max-w-[800px]">
          <Subtitle
            text="How this challenge works"
            className="text-neutral-1000"
          />
          <p className="text-sm md:text-base lg:text-lg text-neutral-1000">
            You&apos;ll set measurable targets, watch your progress unfold, and
            draw strength from others walking the same path.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 rounded-md border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left space-y-2 h-full"
            >
              <div className="p-2">
                <step.icon
                  className="size-8"
                  style={{
                    fill: "url(#icon-gradient)",
                    stroke: "url(#icon-gradient)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-neutral-1000 font-montserrat">
                  {step.title}
                </h4>
                <p className="text-base text-neutral-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ComponentLayout>
    </section>
  );
};
