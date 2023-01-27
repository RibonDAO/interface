import { init } from "@amplitude/analytics-browser";

import * as Sentry from "@sentry/react";

export function initializeSentry(): void {
  if (process.env.NODE_ENV !== "production") return;

  const dsn = process.env.REACT_APP_SENTRY_ID;
  const release = `ribon-interface@${process.env.npm_package_version}`;

  Sentry.init({ dsn, release });
}

export function initializeAmplitude(): any {
  const key = process.env.REACT_APP_AMPLITUDE_API_KEY;
  // leaving this here only until I finish the dashboard
  // if (!key || process.env.NODE_ENV === "development") return;
  if (!key) return;

  init(key);
}
