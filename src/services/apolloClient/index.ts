import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      alert(`Erro ${message}, em ${path} e localização ${locations}`),
    );
  }
});

const API_URL = from([
  errorLink,
  new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/ribondao/subgraphribon",
  }),
]);

export const client = new ApolloClient({
  link: API_URL,
  cache: new InMemoryCache(),
});
