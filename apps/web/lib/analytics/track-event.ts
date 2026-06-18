type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

export const APPLICATION_SAVE_EXIT_EVENT = "application_save_exit" as const;

export function trackAnalyticsEvent(
  eventName: string,
  params?: AnalyticsEventParams,
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    event: eventName,
    ...params,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackApplicationSaveExit(step: number, stepKey: string) {
  trackAnalyticsEvent(APPLICATION_SAVE_EXIT_EVENT, {
    form_name: "leadership_institute",
    application_step: step,
    application_step_name: stepKey,
  });
}
