import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { Languages } from "types/enums/Languages";

export const LANGUAGE_KEY = "LANGUAGE_KEY";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Languages>(
    (getLocalStorageItem(LANGUAGE_KEY) as Languages) || Languages.PT,
  );

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    setLocalStorageItem(LANGUAGE_KEY, currentLang);
  }, [currentLang, i18n]);

  function handleSwitchLanguage() {
    if (currentLang === Languages.EN) {
      setCurrentLang(Languages.PT);
      window.location.reload();
    } else if (currentLang === Languages.PT) {
      setCurrentLang(Languages.EN);
      window.location.reload();
    }
  }

  return {
    currentLang,
    handleSwitchLanguage,
  };
}
