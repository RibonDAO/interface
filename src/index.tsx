import React from "react";
import ReactDOM from "react-dom";
import { initializeAmplitude } from "services/analytics/amplitude";
import { initializeFirebase } from "services/analytics/firebase";
import { initializeMixpanel } from "services/analytics/mixpanel";
import { initializeSentry } from "services/analytics/sentry";
import { initializeApi } from "services/api";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";

declare global {
  interface Window {
    ethereum: any;
  }
}

initializeApi();
initializeAmplitude();
initializeFirebase();
initializeMixpanel();
initializeSentry();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
