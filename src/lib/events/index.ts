import { logAmplitudeEvent } from "services/analytics/amplitude";
import { logFirebaseEvent } from "services/analytics/firebase";
import { logMixpanelEvent } from "services/analytics/mixpanel";
import { logDebugEvent } from "config/debugEventsView";
import events from "./constants";

function eventPageTransalation(url: string) {
  return events.pages[url];
}
class EventNameTooLongError extends Error {}
export interface EventParams {
  [key: string]: string | number | undefined;
}

export function logEvent(
  eventName: string,
  eventParams: EventParams = {},
): void {
  if (eventName.length > 32) {
    throw new EventNameTooLongError();
  } else if (process.env.NODE_ENV === "production") {
    const convertedParams = eventParams;
    convertedParams.anonymousId =
      localStorage.getItem("installationId") ?? "false";
    convertedParams.integrationName =
      localStorage.getItem("integrationName") ?? "false";
    convertedParams.hasDonated = localStorage.getItem("HAS_DONATED") ?? "false";

    logFirebaseEvent(eventName, convertedParams);
    if (eventName.includes("web_")) {
      logMixpanelEvent(eventName, convertedParams);
      logAmplitudeEvent(eventName, convertedParams);
    }
  } else if (process.env.REACT_APP_DEBUG_VIEW === "true") {
    if (logDebugEvent) logDebugEvent(eventName, eventParams);
    console.info(eventName, eventParams);
  }
}

export function newLogEvent(
  action: string,
  eventName: string,
  eventParams: EventParams = {},
): void {
  logEvent(`web_${eventName}_${action}`, eventParams);
}

export function logPageView(
  urlName: string,
  search?: string,
  state?: any,
): void {
  let flow = "";
  let query = "";
  const params: any = {};
  if (state) {
    flow = state.flow ? `?${state.flow}` : "";
    if (state.cause?.id) {
      params.causeId = state.cause.id;
    }
    if (state.nonProfit?.id) {
      params.nonProfitId = state.nonProfit.id;
    }
  }
  if (urlName.includes("promoter") && search?.includes("payment_method=card")) {
    query = "?payment_method=card";
  }
  if (
    urlName.includes("promoter") &&
    search?.includes("payment_method=crypto")
  ) {
    query = "?payment_method=crypto";
  }

  const pageName = eventPageTransalation(urlName + query + flow);

  if (pageName) {
    newLogEvent("view", pageName, params);
  }
}
