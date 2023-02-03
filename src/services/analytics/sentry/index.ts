import * as Sentry from "@sentry/react";

export function initializeSentry(): void {
  if (process.env.NODE_ENV !== "production") return;

  const dsn = process.env.REACT_APP_SENTRY_ID;
  const release = `ribon-interface@${process.env.npm_package_version}`;

  Sentry.init({ dsn, release });
}
