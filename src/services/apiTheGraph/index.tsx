import { ApolloClient, InMemoryCache } from "@apollo/client";
import { THE_GRAPH_API } from "utils/constants";

const APIURL = THE_GRAPH_API;

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
