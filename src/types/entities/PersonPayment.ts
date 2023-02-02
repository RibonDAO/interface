import { Offer } from "@ribon.io/shared";

export interface PersonPayment {
  id: string;
  amount_cents: number;
  crypto_amount: number;
  offer: Offer;
  page: number;
  paid_date: string;
  payment_method: string;
  person: {
    id: string;
    customer: {
      email: string;
    };
    guest: {
      wallet_address: string;
    };
  };
  status: string;
  total_items: number;
  total_pages: number;
}
