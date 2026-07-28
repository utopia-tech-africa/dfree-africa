import * as Sentry from "@sentry/nextjs";

import { getSentryEdgeOptions } from "@/lib/sentry/options";

Sentry.init(getSentryEdgeOptions());
