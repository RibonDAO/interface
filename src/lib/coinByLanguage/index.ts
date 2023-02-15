import { Currencies } from "@ribon.io/shared/types";
import { Languages } from "types/enums/Languages";

export function coinByLanguage(language: Languages) {
  if (language === Languages.PT) return Currencies.BRL;

  return Currencies.USD;
}
