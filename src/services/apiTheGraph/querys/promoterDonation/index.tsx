import { gql } from "@apollo/client";

export const PROMOTER_DONATIONS_ID_QUERY_NAME = "PROMOTER_DONATIONS_ID_QUERY";
export const ALL_PROMOTERS_DONATIONS_QUERY_NAME =
  "ALL_PROMOTERS_DONATIONS_QUERY";

export const QUERY_PROMOTER_DONATION_ID = gql`
  query ${PROMOTER_DONATIONS_ID_QUERY_NAME}($promoter: Bytes!, $first: Int) {
     promoterDonations(where: {promoter: $promoter}
      orderBy: timestamp
      orderDirection: desc
      first: $first
    ) {
      id
      amountDonated
      timestamp
    }
  }
`;

export const QUERY_ALL_PROMOTERS_DONATIONS = gql`
  query ${ALL_PROMOTERS_DONATIONS_QUERY_NAME}($first: Int) {
    promoterDonations(
      orderBy: timestamp
      orderDirection: desc
      first: $first
    ) {
      id
      amountDonated
      timestamp
    }
  }
`;
