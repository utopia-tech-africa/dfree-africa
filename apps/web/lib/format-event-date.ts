function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getOrdinal(day: number): string {
  return `${day}${getOrdinalSuffix(day)}`;
}

export type EventDateOverlayParts = {
  day: string;
  ordinal: string;
  monthYear: string;
};

export function parseEventDateOverlay(isoDate: string): EventDateOverlayParts {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear().toString().slice(-2);

  return {
    day: String(day),
    ordinal: getOrdinalSuffix(day),
    monthYear: `${month} '${year}`,
  };
}

export function formatEventDateOverlay(isoDate: string): string {
  const { day, ordinal, monthYear } = parseEventDateOverlay(isoDate);

  return `${day}${ordinal} ${monthYear}`;
}

export function formatEventDateLong(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return `${getOrdinal(day)} ${month} ${year}`;
}
