import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { LOCAL_STORAGE_LANGUAGE_KEY } from "../constants/localstorage.constants.ts";

import enTranslation from "./locales/en/translation.json";
import faTranslation from "./locales/fa/translation.json";
import nlTranslation from "./locales/nl/translation.json";

export const defaultNS = "translation";

export const resources = {
  en: {
    translation: enTranslation,
  },
  fa: {
    translation: faTranslation,
  },

  nl: {
    translation: nlTranslation,
  },
} as const;

function getLanguage(): string {
  const item = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);

  if (!item || !["en", "fa", "nl"].includes(item)) {
    return "en";
  }

  return item;
}

i18next.use(initReactI18next).init({
  resources,
  ns: ["translation"],
  defaultNS,
  lng: getLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18next.language;
document.documentElement.dir = i18next.dir();
