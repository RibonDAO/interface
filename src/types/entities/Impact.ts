import NonProfit from "./NonProfit";

export default interface Impact {
  id: number;
  impact: string;
  walletAddress: string;
  totalDonated: number;
  nonProfit: NonProfit;
}
