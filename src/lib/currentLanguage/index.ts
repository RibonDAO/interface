import { Languages } from "@ribon.io/shared/types";
import { getLocalStorageItem } from "lib/localStorage";

export const I18NEXTLNG = "i18nextLng";

export function formattedLanguage(language: string | null): Languages {
  switch (language) {
    case "en-US":
      return Languages.en;
    case "en":
      return Languages.en;
    case "pt":
      return Languages.PT;
    case "pt-BR":
      return Languages.PT;
    default:
      return Languages.en;
  }
}

export function normalizedLanguage(): Languages {
  return formattedLanguage(
    getLocalStorageItem(I18NEXTLNG) || navigator.language,
  );
}
