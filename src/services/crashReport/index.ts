import * as Sentry from "@sentry/react";
import { Severity } from "@sentry/react";

type LogErrorProps = {
  customMessage?: string;
  context?: Record<string, unknown>;
  level?: Severity;
};

export const ErrorLevel = Severity;

export function logError(
  error: any,
  { customMessage, context = {}, level = ErrorLevel.Error }: LogErrorProps = {},
): void {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  Sentry.setTags({
    errorMessage: error.message,
    customMessage: customMessage || "",
  });

  Sentry.captureException(error, {
    level,
    contexts: { contextParams: context },
  });
}
