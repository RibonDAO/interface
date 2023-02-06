import mixpanel from "mixpanel-browser";

export function initializeMixpanel() {
  mixpanel.init(process.env.REACT_APP_AMPLITUDE_API_KEY, {debug: true}); 
  mixpanel.track("Sign up");
}