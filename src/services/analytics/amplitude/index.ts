import { init } from "@amplitude/analytics-browser";

export function initializeAmplitude(): any {
  const key = process.env.REACT_APP_AMPLITUDE_API_KEY;
  // leaving this here only until I finish the dashboard
  // if (!key || process.env.NODE_ENV === "development") return;
  if (!key) return;

  init(key);
}
