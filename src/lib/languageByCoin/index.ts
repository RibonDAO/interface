import { Currencies } from "@ribon.io/shared/types";
import { Languages } from "types/enums/Languages";

export function languageByCoin(coin: string) {
  if (coin.toUpperCase() === Currencies.BRL) return Languages.PT;

  return Languages.EN;
}
