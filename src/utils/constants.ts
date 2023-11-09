import { getLocalStorageItem } from "lib/localStorage";
import { SUBGRAPH_URL } from "lib/localStorage/constants";

export const RIBON_COMPANY_ID = process.env.REACT_APP_RIBON_COMPANY_ID || "1";

export const RIBON_GROWTHBOOK_URL =
  process.env.REACT_APP_RIBON_GROWTHBOOK_URL ||
  "https://growthbook.ribon.io:444/api/features/staging_Crjm8K6L2Rzpl96doCeg0kBiurgT5T67YP84V8bIQ";

export const RIBON_API =
  process.env.REACT_APP_RIBON_API || "https://dapp-dev-api.ribon.io/";

export const THE_GRAPH_API =
  getLocalStorageItem(SUBGRAPH_URL) ||
  "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph";

export const PLATFORM = "web";

export const APP_LINK = "https://donation.app.link/RibonApp";

export const APP_INTEGRATION_LINK = "https://donation.app.link/1VkFv9U1yBb";

export const ANDROID_APP_LINK =
  "https://play.google.com/store/apps/details?id=com.app.ribon&hl=pt_BR&gl=US";
export const IOS_APP_LINK = "https://apps.apple.com/br/app/ribon/id1337763424";

export const DEBUG_EVENTS_ENABLED = process.env.REACT_APP_DEBUG_VIEW === "true";

export const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY";

export const INTEGRATION_AUTH_ID = process.env.REACT_APP_INTEGRATION_AUTH_ID || "183";
