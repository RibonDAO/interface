import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";

export const LANGUAGE_KEY = "LANGUAGE_KEY";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    getLocalStorageItem(LANGUAGE_KEY) || "pt-BR",
  );

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    setLocalStorageItem(LANGUAGE_KEY, currentLang);
  }, [currentLang, i18n]);

  function handleSwitchLanguage() {
    if (currentLang === "en-US") {
      setCurrentLang("pt-BR");
      window.location.reload();
    } else if (currentLang === "pt-BR") {
      setCurrentLang("en-US");
      window.location.reload();
    }
  }

  return {
    currentLang,
    handleSwitchLanguage,
  };
}
