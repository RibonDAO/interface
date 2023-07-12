import { formatPriceWithZeros } from "../currencyFormatter";

export const formatFee = (fee: number, currency?: string) => {
  if (!currency) {
    return "0 USDC";
  }
  return formatPriceWithZeros(
    fee,
    currency,
    currency === "brl" ? "pt-BR" : "en",
  );
};
