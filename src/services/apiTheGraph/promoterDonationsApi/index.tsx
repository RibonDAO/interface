import { gql, ApolloQueryResult } from "@apollo/client";
import { client } from "..";

export const queryPromoter = `
  query ($user: Bytes!, $first: Int) {
    promoterDonations (where: { user: $user } orderBy: timestamp, orderDirection: desc first: $first){
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
      query: gql(queryPromoter),
      variables: {
        user,
        first,
      },
    }),
};

export default promoterDonationsApi;
