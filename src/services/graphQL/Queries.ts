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

export const LOAD_USER_IMPACT = gql`
  query {
    donationBalances(
      where: {
        user: "0xe5b3a11f62334edbdaf5dafb8d9321379434cccbe4f33006d346ec3b6f8bc8cf"
      }
    ) {
      id
      integration
      totalDonated
      nonProfit
      user
    }
  }
`;
