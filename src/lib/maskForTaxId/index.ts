import { Languages } from "@ribon.io/shared/types";
import { TaxIdPTBR } from "types/enums/TaxIdPTBR";
import { TaxIdUS } from "types/enums/TaxIdUS";

export function maskForTaxId(coin: string, currentLang: Languages) {
  const TaxId = currentLang === Languages.PT ? TaxIdPTBR : TaxIdUS;
  const key = coin
    .toUpperCase()
    .replace(/\s/g, "")
    .split("(")[0] as keyof typeof TaxId;
  if (key in TaxId) return TaxId[key];

  return "";
}
