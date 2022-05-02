import { ApolloClient, InMemoryCache } from "@apollo/client";

export const APIURL =
  "https://api.thegraph.com/subgraphs/name/ribondao/subgraphribon";

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
