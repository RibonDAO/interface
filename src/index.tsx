import React from "react";
import ReactDOM from "react-dom";
import { initializeFirebase } from "services/firebase";
import { initializeSentry } from "services/sentry";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";

declare global {
  interface Window {
    ethereum: any;
  }
}

initializeFirebase();
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
