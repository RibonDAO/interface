import { Offer } from "@ribon.io/shared";
import Cause from "./Cause";
import NonProfit from "./NonProfit";

export interface PersonPayment {
  id: string;
  amountCents: number;
  cryptoAmount: number;
  offer: Offer;
  page: number;
  paidDate: string;
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
  serviceFees: number;
  receiver: NonProfit | Cause;
  status: string;
  totalItems: number;
  totalPages: number;
}
