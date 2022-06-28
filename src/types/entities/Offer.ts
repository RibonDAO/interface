export default interface Offer {
  id: number;
  currency: "usd" | "brl";
  subscription: boolean;
  priceCents: number;
  price: string;
  priceValue: number;
  active: boolean;
  title?: string;
  positionOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
