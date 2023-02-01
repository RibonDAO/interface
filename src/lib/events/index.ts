import { logFirebaseEvent } from "services/analytics";
import events from "./constants";

interface EventParams {
  [key: string]: string | number | undefined;
}
export function logEvent(name: string, params?: EventParams) {
  logFirebaseEvent(name, params);
}

function eventPageTransalation(url: string) {
  return events.pages[url];
}

export function logPageView(urlName: string, search?: string, state?: any) {
  let flow = "";
  let query = "";
  const params: any = {};
  if (state) {
    flow = state.flow ? `?${state.flow}` : "";
    if (state.cause?.id) {
      params.causeId = state.cause.id;
    }
    if (state.nonProfit?.id) {
      params.nonProfitId = state.nonProfit.id;
    }
  }
  if (urlName.includes("promoter") && search?.includes("payment_method=card")) {
    query = "?payment_method=card";
  }
  if (
    urlName.includes("promoter") &&
    search?.includes("payment_method=crypto")
  ) {
    query = "?payment_method=crypto";
  }
  const pageName = eventPageTransalation(urlName + query + flow);

  if (pageName) {
    const event = `web_${pageName}_view`;
    logEvent(event, params);
  }
}
