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

export const IOS_APP_LINK = "https://testflight.apple.com/join/UtOMP5Ie";

export const DEBUG_EVENTS_ENABLED = process.env.REACT_APP_DEBUG_VIEW === "true";
