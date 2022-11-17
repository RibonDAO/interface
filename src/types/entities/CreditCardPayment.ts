export default interface CreditCardPayment {
  country: string;
  state: string;
  city: string;
  taxId: string;
  offerId: number;
  integrationId: string | number;
  email: string;
  card: {
    number: string;
    name: string;
    expirationYear: string;
    expirationMonth: string;
    cvv: string;
  };
  causeId?: number;
  nonProfitId?: number;
}
