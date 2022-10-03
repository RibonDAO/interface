import NonProfit from "./NonProfit";
import User from "./User";

export default interface Donation {
  id: number;
  createdAt: string;
  impact: string;
  nonProfit: NonProfit;
  user: User;
  value: string;
}
