import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    ns: "translation",
    defaultNS: "translation",
    preload: ["en", "pt-BR"],
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
