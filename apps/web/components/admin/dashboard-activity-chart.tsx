import type { DashboardActivityPoint } from "@/lib/admin/get-dashboard-activity";

type DashboardActivityChartProps = {
  data: DashboardActivityPoint[];
};

function buildLinePath(
  values: number[],
  maxValue: number,
  width: number,
  height: number,
  padding: { top: number; right: number; bottom: number; left: number },
) {
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const lastIndex = Math.max(values.length - 1, 1);

  const points = values.map((value, index) => {
    const x = padding.left + (index / lastIndex) * chartWidth;
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

    return { x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding.left} ${
    padding.top + chartHeight
  } L ${points[0]?.x ?? padding.left} ${padding.top + chartHeight} Z`;

  return { linePath, areaPath, points };
}

export function DashboardActivityChart({ data }: DashboardActivityChartProps) {
  const maxValue = Math.max(
    1,
    ...data.map((point) => Math.max(point.applications, point.saveExits)),
  );
  const hasActivity = data.some(
    (point) => point.applications > 0 || point.saveExits > 0,
  );

  const width = 720;
  const height = 220;
  const padding = { top: 16, right: 12, bottom: 28, left: 12 };

  const applications = buildLinePath(
    data.map((point) => point.applications),
    maxValue,
    width,
    height,
    padding,
  );

  const saveExits = buildLinePath(
    data.map((point) => point.saveExits),
    maxValue,
    width,
    height,
    padding,
  );

  const gridLines = [0, 0.5, 1].map((ratio) => {
    const y = padding.top + (height - padding.top - padding.bottom) * ratio;
    return y;
  });

  if (!hasActivity) {
    return (
      <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/80 px-4 text-center text-sm text-neutral-700">
        Activity will appear here once applicants use the form.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-700">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary-500" aria-hidden />
          <span>Applications submitted</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full border-2 border-primary-400 bg-transparent"
            aria-hidden
          />
          <span>Save & exit</span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Application activity over the last two weeks"
      >
        <defs>
          <linearGradient
            id="applications-area-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#4d6731" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4d6731" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridLines.map((y) => (
          <line
            key={y}
            x1={padding.left}
            x2={width - padding.right}
            y1={y}
            y2={y}
            stroke="#e5e5e5"
            strokeDasharray="4 4"
          />
        ))}

        <path
          d={applications.areaPath}
          fill="url(#applications-area-gradient)"
        />
        <path
          d={applications.linePath}
          fill="none"
          stroke="#4d6731"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={saveExits.linePath}
          fill="none"
          stroke="#6b9044"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {applications.points.map((point, index) => (
          <g key={data[index]?.dateKey ?? index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#ffffff"
              stroke="#4d6731"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={height - 8}
              textAnchor="middle"
              className="fill-neutral-600 text-[11px]"
            >
              {data[index]?.label ?? ""}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
