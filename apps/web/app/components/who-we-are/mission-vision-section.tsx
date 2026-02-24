import { Title } from "@/components/title-and-subtitle/title";

export const MissionVisionSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 md:px-0">
      <div className="flex flex-col gap-3 w-full md:w-1/2">
        <Title className="text-tertiary-500" text="Who we are" />
        <p className="font-montserrat font-bold text-neutral-1000 text-base sm:text-lg md:text-xl lg:text-[24px] leading-[120%]">
          <span className="text-secondary-600">
            DFREE Global Foundation, Inc.
          </span>{" "}
          is a national nonprofit advancing financial wellness, economic
          empowerment, and self-sufficiency in underserved communities by
          delivering free, community-centered initiatives that help families
          build lasting financial confidence and freedom.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 w-full md:w-1/2 items-start sm:items-end">
        <div className="flex flex-col gap-3 w-full sm:w-1/2 md:w-full lg:w-1/2">
          <Title className="text-tertiary-500" text="Mission" />
          <p className="font-poppins text-neutral-1000 text-sm sm:text-base md:text-lg leading-[130%]">
            Advance financial wellness in underserved communities through free
            programs and tools that help build lasting financial confidence.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-1/2 md:w-full lg:w-1/2">
          <Title className="text-tertiary-500" text="Vision" />
          <p className="font-poppins text-neutral-1000 text-sm sm:text-base md:text-lg leading-[130%]">
            A future where every community has the resources and confidence to
            achieve financial freedom and generational progress.
          </p>
        </div>
      </div>
    </div>
  );
};
