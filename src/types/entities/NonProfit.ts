export default interface NonProfit {
  id: number;
  name: string;
  walletAddress: string;
  impactDescription: string;
  description: string;
  link: string;
  backgroundImage: string;
  coverImage: string;
  mainImage: string;
  logo: string;
  impactByTicket: number;
  createdAt?: string;
  updatedAt?: string;
}
