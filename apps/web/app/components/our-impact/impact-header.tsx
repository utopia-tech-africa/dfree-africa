import { IMPACT_CONTENT } from "@/lib/impact";

export function ImpactHeader() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-montserrat text-base font-bold leading-[33px] text-tertiary-500">
        {IMPACT_CONTENT.label}
      </p>
      <h2
        id="our-impact-heading"
        className="w-full font-montserrat text-[26px] font-bold leading-[1.2] text-neutral-1000 md:max-w-[399px] md:text-[32px]"
      >
        {IMPACT_CONTENT.title}
      </h2>
      <p className="w-full font-poppins text-sm leading-[1.2] text-neutral-900 md:text-lg md:leading-normal">
        {IMPACT_CONTENT.description}
      </p>
    </div>
  );
}
