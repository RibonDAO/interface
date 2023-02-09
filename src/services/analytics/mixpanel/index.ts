import { EventParams } from "lib/events";
import mixpanel from "mixpanel-browser";
import { logError } from "services/crashReport";

export function initializeMixpanel() {
  const key = process.env.REACT_APP_MIXPANEL_API_KEY;
  if (!key) return;

  mixpanel.init(key);
}

export function logMixpanelEvent(
  eventName: string,
  params: EventParams = {},
): void {
  try {
    mixpanel.track(eventName, params);
  } catch (error) {
    logError(error, {
      customMessage: "Error sending event to mixpanel",
      context: { eventName },
    });
  }
}
