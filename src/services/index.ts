import firebase from "firebase/app";
import "firebase/analytics";
import * as Sentry from "@sentry/react";

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

export function initializeSentry(): void {
  if (process.env.NODE_ENV !== "production") return;

  const dsn = process.env.REACT_APP_SENTRY_ID;
  const release = `ribon-interface@${process.env.npm_package_version}`;

  Sentry.init({ dsn, release });
}
