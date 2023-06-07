import { getLocalStorageItem } from "lib/localStorage";
import { LANGUAGE_KEY } from "hooks/useLanguage";
import { Languages } from "@ribon.io/shared/types";

export function formattedLanguage(language: string | null) {
  switch (language) {
    case "en-US":
      return "en";
    case "en":
      return "en";
    case "pt-BR":
      return "pt-BR";
    default:
      return "en";
  }
}

export function formattedShortLanguage(language: string | null): Languages {
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

export function normalizedLanguage(): string {
  const language = getLocalStorageItem(LANGUAGE_KEY) || navigator.language;

  return formattedLanguage(language);
}
