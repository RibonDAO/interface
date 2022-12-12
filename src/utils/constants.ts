import { getLocalStorageItem } from "lib/localStorage";
import { SUBGRAPH_URL } from "lib/localStorage/constants";

export const RIBON_COMPANY_ID = process.env.REACT_APP_RIBON_COMPANY_ID || "1";

export const RIBON_GROWTHBOOK_URL =
  "https://growthbook.ribon.io:444/api/features/key_prod_2161769c509d739b";

export const RIBON_API =
  process.env.REACT_APP_RIBON_API || "https://dapp-dev-api.ribon.io/";

export const THE_GRAPH_API =
  getLocalStorageItem(SUBGRAPH_URL) ||
  "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph";
