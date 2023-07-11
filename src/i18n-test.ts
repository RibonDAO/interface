import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../public/locales/en-US/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en-US",
    fallbackLng: "en-US",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: translationEN,
      },
    },
  });

export default i18n;
