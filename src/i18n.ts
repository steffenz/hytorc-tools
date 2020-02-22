import i18n from "i18next";
import english from "./translations/en.json";
import norwegian from "./translations/no.json";


let queryLanguage, selectedLangauge;

try {
  let searchParams = new URLSearchParams(window.location.search);
  queryLanguage = searchParams.get('lang');
} catch(e){
  // Ignore - will fallback to default in switch-block
}

switch(queryLanguage){
  case 'no':
  case 'en':
    selectedLangauge = queryLanguage;
    break;

  default:
    selectedLangauge = 'no';
}

i18n
  .init({
    // debug: true,
    lng: selectedLangauge,
    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: english
      },
      no: {
        translations: norwegian
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
