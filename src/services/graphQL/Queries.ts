import { gql } from "@apollo/client";

export const LOAD_NON_PROFITS = gql`
  query {
    nonProfits {
      id
      isNonProfitOnWhitelist
    }
  }
`;

export const LOAD_INTEGRATIONS = gql`
  query {
    integrations {
      id
      balance
    }
  }
`;

export const LOAD_PROMOTERS = gql`
  query {
    promoters {
      id
      totalDonated
    }
  }
`;
