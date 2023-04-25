import { getLocalStorageItem } from "lib/localStorage";
import { SUBGRAPH_URL } from "lib/localStorage/constants";

export const RIBON_COMPANY_ID = process.env.REACT_APP_RIBON_COMPANY_ID || "1";

export const RIBON_GROWTHBOOK_URL =
  "https://growthbook.ribon.io:444/api/features/key_prod_2161769c509d739b";

export const RIBON_API =
  process.env.REACT_APP_RIBON_API || "https://dapp-api.ribon.io/";

export const THE_GRAPH_API =
  getLocalStorageItem(SUBGRAPH_URL) ||
  "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph";

export const PLATFORM = "web";

export const LINK_TREE = "https://linktr.ee/appribon";

export const ANDROID_APP_LINK =
  "https://play.google.com/store/apps/details?id=com.app.ribon";

export const IOS_APP_LINK = "https://testflight.apple.com/join/UtOMP5Ie";
