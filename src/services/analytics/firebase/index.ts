import firebase from "firebase/app";
import "firebase/analytics";
import { logError } from "services/crashReport";
import { EventParams } from "lib/events";

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
    if (params[key] === undefined || params[key] === null) {
      convertedParams[key] = "";
    } else {
      convertedParams[key] = params[key]?.toString();
    }
  });

  return convertedParams;
}

export function logFirebaseEvent(
  eventName: string,
  params: EventParams = {},
): void {
  try {
    const convertedParams = params ? convertParamsToString(params) : {};
    firebase.analytics().logEvent(eventName, convertedParams);
  } catch (error) {
    logError(error, {
      customMessage: "Error sending event to firebase",
      context: { eventName },
    });
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
