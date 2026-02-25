import React from "react";

interface QuotationMarksProps extends React.SVGProps<SVGSVGElement> {}

const QuotationMarks = ({ className, ...props }: QuotationMarksProps) => {
  return (
    <svg
      viewBox="0 0 188 196"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M-57.8799 97.65V195.3H39.7701V97.65H-9.04989C-9.04989 70.73 12.8501 48.83 39.7701 48.83V0C-14.1599 0 -57.8799 43.72 -57.8799 97.65ZM187.88 48.83V0C133.95 0 90.2301 43.72 90.2301 97.65V195.3H187.88V97.65H139.06C139.05 70.73 160.95 48.83 187.88 48.83Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="47"
          y1="58.1499"
          x2="212.5"
          y2="208.15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6B9044" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default QuotationMarks;
