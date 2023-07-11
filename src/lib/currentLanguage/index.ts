import { Languages } from "@ribon.io/shared/types";
import { getLocalStorageItem } from "lib/localStorage";

export function formattedLanguage(language: string | null): Languages {
  switch (language) {
    case "en-US":
      return Languages.EN;
    case "en":
      return Languages.EN;
    case "pt":
      return Languages.PT;
    case "pt-BR":
      return Languages.PT;
    default:
      return Languages.EN;
  }
}

export function normalizedLanguage(): Languages {
  return formattedLanguage(
    getLocalStorageItem("i18nextLng") || navigator.language,
  );
}
