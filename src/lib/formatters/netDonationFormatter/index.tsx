import { formatPriceWithZeros } from "../currencyFormatter";

export const formatNetDonation = (
  fee: number,
  amountCents: number,
  priceCents?: number,
  currency?: string,
) => {
  if (!priceCents) {
    return `${amountCents / 100} USDC`;
  }
  return formatPriceWithZeros(
    priceCents / 100 - fee,
    currency ?? "",
    currency === "brl" ? "pt" : "en",
  );
};
