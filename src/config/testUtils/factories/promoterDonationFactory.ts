import { PromoterDonation } from "@ribon.io/shared/types";

function promoterDonationFactory(
  params: Partial<PromoterDonation> = {},
): PromoterDonation {
  const defaultValues: PromoterDonation = {
    id: "0x785e734ab932c0a296598ef6e309e7ec19ef09a2ddb458b6b11c9ba7a7249f9a",
    user: "0x6e060041d62fdd76cf27c582f62983b864878e8f",
    amountDonated: "770000000000000000",
    timestamp: "1652899420",
  };
  return Object.assign(defaultValues, params) as PromoterDonation;
}

export default promoterDonationFactory;
