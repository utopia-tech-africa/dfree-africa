export {};

type GtagEventParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (
  command: "event" | "config" | "js",
  targetOrEvent: string,
  params?: GtagEventParams,
) => void;

declare global {
  interface Window {
    dataLayer?: GtagEventParams[];
    gtag?: GtagFn;
  }
}
