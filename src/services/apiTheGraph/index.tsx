import { ApolloClient, InMemoryCache } from "@apollo/client";

export const THE_GRAPH_API =
  "https://api.thegraph.com/subgraphs/name/ribondao/subgraphribon";

export const APIURL = process.env.REACT_APP_THE_GRAPH_URL || THE_GRAPH_API;

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
