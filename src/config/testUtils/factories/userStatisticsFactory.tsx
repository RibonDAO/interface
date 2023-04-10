import { UserStatistics } from "@ribon.io/shared/types";

function userStatisticsFactory(
  params: Partial<UserStatistics> = {},
): UserStatistics {
  const defaultValues: UserStatistics = {
    totalCauses: 2,
    totalNonProfits: 4,
    totalDonated: {
      brl: 15,
      usd: 3,
    },
    totalTickets: 1,
  };
  return Object.assign(defaultValues, params) as UserStatistics;
}

export default userStatisticsFactory;
