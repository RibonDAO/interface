import { ApolloQueryResult } from "@apollo/client";
import { client } from "..";
import { QUERY_ALL_POOLS, QUERY_POOL_ID } from "../querys/pool";

export const poolsApi = {
  fetchAllPools: (): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_ALL_POOLS,
      fetchPolicy: "no-cache",
    }),

  fetchPool: (pool: string): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_POOL_ID,
      variables: { pool },
      fetchPolicy: "no-cache",
    }),
};

export default poolsApi;
