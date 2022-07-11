import { ApolloQueryResult } from "@apollo/client";
import { client } from "..";
import {
  QUERY_PROMOTER_DONATION_ID,
  QUERY_ALL_PROMOTERS_DONATIONS,
} from "../querys/promoterDonation";

export const promoterDonationsApi = {
  fetchPromoterDonations: (
    promoter: string,
    first: number,
  ): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_PROMOTER_DONATION_ID,
      variables: {
        promoter,
        first,
      },
      fetchPolicy: "no-cache",
    }),

  fetchAllPromotersDonations: (
    first: number,
  ): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_ALL_PROMOTERS_DONATIONS,
      variables: {
        first,
      },
      fetchPolicy: "no-cache",
    }),
};

export default promoterDonationsApi;
