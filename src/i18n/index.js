import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/translationEN.json";
import az from "./locales/translationAZ.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      az: { translation: az },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

