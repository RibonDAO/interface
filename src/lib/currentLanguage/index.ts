import { getLocalStorageItem } from "lib/localStorage";
import { LANGUAGE_KEY } from "hooks/useLanguage";

export function formattedLanguage(language: string | null) {
  switch (language) {
    case "en-US":
      return "en";
    case "pt-BR":
      return "pt-BR";
    default:
      return "pt-BR";
  }
}

export function normalizedLanguage(): string {
  const language = getLocalStorageItem(LANGUAGE_KEY);
  return formattedLanguage(language);
}
