import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "@ribon.io/shared/types";
import { normalizedLanguage } from "lib/currentLanguage";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Languages>(
    normalizedLanguage(),
  );

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang]);

  function handleSwitchLanguage() {
    if (currentLang === Languages.en) {
      setCurrentLang(Languages.PT);
      window.location.reload();
    } else if (currentLang === Languages.PT) {
      setCurrentLang(Languages.en);
      window.location.reload();
    }
  }

  return {
    currentLang,
    handleSwitchLanguage,
  };
}
