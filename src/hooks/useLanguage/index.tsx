import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "@ribon.io/shared/types";
import { normalizedLanguage } from "lib/currentLanguage";
import { setLocalStorageItem } from "lib/localStorage";

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<Languages>(
    normalizedLanguage(),
  );

  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    setLocalStorageItem("COUNTRY", t("brazilName"));
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
    setCurrentLang,
  };
}
