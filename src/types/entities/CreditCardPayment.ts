export default interface CreditCardPayment {
  country: string;
  state: string;
  city: string;
  taxId: string;
  offerId: number;
  email: string;
  card: {
    number: string;
    name: string;
    expirationYear: string;
    expirationMonth: string;
    cvv: string;
  };
}
