import { Currencies, Languages } from "@ribon.io/shared/types";

export function coinByLanguage(language: Languages) {
  if (language === Languages.PT) return Currencies.BRL;

  return Currencies.USD;
}
