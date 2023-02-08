import * as amplitude from "@amplitude/analytics-browser";
import { EventParams } from "lib/events";
import { logError } from "services/crashReport";

export function initializeAmplitude(): any {
  const key = process.env.REACT_APP_AMPLITUDE_API_KEY;
  if (!key) return;

  amplitude.init(key);
}

export function logAmplitudeEvent(
  eventName: string,
  params: EventParams = {},
): void {
  try {
    amplitude.track(eventName, params);
  } catch (error) {
    logError(error, {
      customMessage: "Error sending event to amplitude",
      context: { eventName },
    });
  }
}
