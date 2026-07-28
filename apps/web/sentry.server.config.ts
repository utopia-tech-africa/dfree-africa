import * as Sentry from "@sentry/nextjs";

import { getSentryServerOptions } from "@/lib/sentry/options";

Sentry.init(getSentryServerOptions());
