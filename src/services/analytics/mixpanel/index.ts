import mixpanel from "mixpanel-browser";

export function initializeMixpanel() {
  const key = process.env.REACT_APP_AMPLITUDE_API_KEY
  if (!key) return;

  mixpanel.init(key); 
  mixpanel.track("Sign up");
}