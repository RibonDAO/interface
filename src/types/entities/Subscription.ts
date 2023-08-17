import { PersonPayment } from "@ribon.io/shared";

export default interface Subscription {
  id?: number;
  person_payments: PersonPayment[];
}
