import firebase from "firebase/app";
import "firebase/analytics";
import { logError } from "../crashReport";

interface EventParams {
  [key: string]: string | number | undefined;
}

export function convertParamsToString(params: EventParams): EventParams {
  const convertedParams = params;

  Object.keys(params).forEach((key) => {
    convertedParams[key] = params[key] ? params[key]?.toString() : "";
  });

  return convertedParams;
}

export class EventNameTooLongError extends Error {}

export function logEvent(eventName: string, params?: EventParams): void {
  try {
    if (eventName.length > 32) {
      throw new EventNameTooLongError();
    } else if (process.env.NODE_ENV === "production") {
      const convertedParams = params
        ? convertParamsToString(params)
        : undefined;

      firebase.analytics().logEvent(eventName, convertedParams);
    }
  } catch (error) {
    if (!(error instanceof EventNameTooLongError)) {
      logError(error, {
        customMessage: "Error sending event to analytics",
        context: { params },
      });
    }
  }
}

export function setUserProperties(
  properties: firebase.analytics.CustomParams,
): void {
  try {
    firebase.analytics().setUserProperties(properties);
  } catch (error) {
    logError(error, { customMessage: "Error sending properties to analytics" });
  }
}

export function setUserId(userId: number): void {
  const preparedUserId = userId.toString();
  firebase.analytics().setUserId(preparedUserId);
}
