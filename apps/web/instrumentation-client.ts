import * as Sentry from "@sentry/nextjs";

import { getSentryBaseOptions } from "@/lib/sentry/options";

Sentry.init({
  ...getSentryBaseOptions(),
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
