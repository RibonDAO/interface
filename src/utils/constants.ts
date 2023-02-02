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

export const SURVEY_IN_EN =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6Z7YQh56lIxD3uh1kX8TwlbkF6c9Q4nkQ1SXdblOljzFs-w/viewform?usp=sf_link";

export const SURVEY_IN_PT_BR =
  "https://docs.google.com/forms/d/e/1FAIpQLSfBpxhZIYl5QKvtlPGP3UOWpVskIRn_RD5-o1QF6b4QcO0lsA/viewform?usp=sf_link";
