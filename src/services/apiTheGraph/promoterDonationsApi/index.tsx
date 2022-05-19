import { gql, ApolloQueryResult } from "@apollo/client";
import { client } from "..";

export const PROMOTER_DONATIONS_QUERY_NAME = "PROMOTER_DONATIONS_QUERY";

export const QUERY_PROMOTER = gql`
  query ${PROMOTER_DONATIONS_QUERY_NAME}($user: Bytes!, $first: Int) {
    promoterDonations(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
      first: $first
    ) {
      id
      user
      amountDonated
      timestamp
    }
  }
`;

export const promoterDonationsApi = {
  fetchPromoterDonations: (
    user: string,
    first: number,
  ): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_PROMOTER,
      variables: {
        user,
        first,
      },
      fetchPolicy: "no-cache",
    }),
};

export default promoterDonationsApi;
