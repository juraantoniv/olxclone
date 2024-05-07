import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Gallery: "Gallery",
        Description: "Description",
      },
    },
    ua: {
      translation: {
        Gallery: "Галерея",
        Home: "Домашня",
        sellCar: "Продати",
        LogOut: "Вийти",
        Description: "Опис",
      },
    },
  },
  lng: localStorage.getItem("language") || "en",
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
