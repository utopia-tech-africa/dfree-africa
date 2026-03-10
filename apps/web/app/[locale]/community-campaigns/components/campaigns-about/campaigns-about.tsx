import ComponentLayout from "@/components/component-layout";

export const CampaignsAbout = () => {
  return (
    <ComponentLayout className="flex flex-col items-center justify-center gap-6 text-center mt-10 max-w-3xl">
      <h3 className="text-2xl md:text-3xl lg:text-[38px] font-bold font-montserrat leading-[120%] text-neutral-1000 md:text-nowrap">
        What are community campaigns
      </h3>
      <p className="font-poppins text-base md:text-lg leading-[130%]">
        Community campaigns bring together entire neighborhoods to tackle
        financial challenges as one. Unlike isolated programs, these coordinated
        efforts create momentum, accountability, and lasting transformation.
      </p>
    </ComponentLayout>
  );
};
