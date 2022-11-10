export default interface User {
  id: number;
  email: string;
  lastDonationAt?: string;
  lastDonatedCause?: number;
}
