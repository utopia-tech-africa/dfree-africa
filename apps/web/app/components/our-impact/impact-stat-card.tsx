import { cn } from "@/lib/utils";

export type ImpactStatCardProps = {
  value: string;
  suffix?: string;
  label: string;
  className?: string;
};

export function ImpactStatCard({
  value,
  suffix = "",
  label,
  className,
}: ImpactStatCardProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex flex-col items-start font-bold leading-none whitespace-nowrap">
        <div className="flex items-center font-montserrat text-[38px] text-primary-500 lg:text-[56px]">
          <span className="leading-[49.4px]">{value}</span>
          {suffix && <span className="leading-[49.4px]">{suffix}</span>}
        </div>
        <p className="font-montserrat text-sm leading-[33px] text-[#404f4f] lg:text-[18px]">
          {label}
        </p>
      </div>
    </div>
  );
}
