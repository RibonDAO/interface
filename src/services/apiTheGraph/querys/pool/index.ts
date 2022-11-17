import { gql } from "@apollo/client";

export const ALL_POOLS_QUERY_NAME = "INTEGRATION_ID_QUERY";
export const POOL_ID_QUERY_NAME = "POOL_ID_QUERY";

export const QUERY_ALL_POOLS = gql`
  query ${ALL_POOLS_QUERY_NAME} {
    pools {
      id
      balance
    }
  }
`;

export const QUERY_POOL_ID = gql`
  query ${POOL_ID_QUERY_NAME}($pool: Bytes!) {
    pools(
      where: { id: $pool }
    ) {
      id
      balance
    }
  }
`;
