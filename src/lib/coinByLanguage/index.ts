import { Currencies } from "types/enums/Currencies";
import { Languages } from "types/enums/Languages";

export function coinByLanguage(language: Languages) {
  if (language === Languages.PT) return Currencies.BRL;

  return Currencies.USD;
}
