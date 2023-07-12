import { Currencies, Languages } from "@ribon.io/shared/types";

export function languageByCoin(coin: string) {
  if (coin.toUpperCase() === Currencies.BRL) return Languages.PT;

  return Languages.en;
}
