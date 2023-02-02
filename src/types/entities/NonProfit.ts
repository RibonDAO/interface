import Cause from "./Cause";
import { NonProfitImpact } from "./NonProfitImpact";
import Story from "./Story";

export default interface NonProfit {
  id: any;
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
  nonProfitImpacts?: NonProfitImpact[];
  stories?: Story[];
}
