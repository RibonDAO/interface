import Cause from "./Cause";

export default interface NonProfit {
  id: number;
  name: string;
  walletAddress: string;
  impactDescription: string;
  backgroundImage: string;
  coverImage: string;
  mainImage: string;
  logo: string;
  impactByTicket: number;
  createdAt?: string;
  updatedAt?: string;
  cause: Cause;
}
