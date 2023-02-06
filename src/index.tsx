import React from "react";
import ReactDOM from "react-dom";
import { initializeFirebase } from "services/analytics/firebase";
import { initializeSentry } from "services/analytics/sentry";
import { initializeAmplitude } from "./services/analytics/amplitude";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { initializeMixpanel } from "services/analytics/mixpanel";

declare global {
  interface Window {
    ethereum: any;
  }
}

initializeFirebase();
initializeSentry();
initializeAmplitude();
initializeMixpanel();

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
