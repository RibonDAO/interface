import firebase from "firebase/app";
import "firebase/analytics";
import { logError } from "services/crashReport";

interface EventParams {
  [key: string]: string | number | undefined;
}

export function initializeFirebase(): any {
  if (process.env.NODE_ENV === "development") return;
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);
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
      const convertedParams = params ? convertParamsToString(params) : {};

      convertedParams.anonymousId =
        localStorage.getItem("installationId") ?? "false";
      convertedParams.integrationName =
        localStorage.getItem("integrationName") ?? "false";
      convertedParams.hasDonated =
        localStorage.getItem("HAS_DONATED") ?? "false";
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

export function setUserId(userId: number | string): void {
  const preparedUserId = userId.toString();
  firebase.analytics().setUserId(preparedUserId);
}