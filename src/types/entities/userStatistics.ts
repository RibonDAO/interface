export interface UserStatistics {
  totalTickets: number;
  totalDonated: {
    brl: number;
    usd: number;
  };
  totalNonProfits: number;
  totalCauses: number;
}
