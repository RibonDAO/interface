import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SUBGRAPH_API } from "utils/constants";

const APIURL = SUBGRAPH_API;

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
