import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fetchTranslations } from "../services/translations";

/**
 * Custom i18next backend that loads translations from our API
 * This replaces the need for local JSON files and ensures all translations come from the API
 */
const ApiBackend = {
  type: "backend" as const,

  /**
   * Called by i18next when it needs to load translations for a language/namespace
   */
  read: async (
    lng: string,
    ns: string,
    callback: (err: unknown, data?: unknown) => void
  ) => {
    try {
      console.log(
        `ApiBackend: Loading translations for language: ${lng}, namespace: ${ns}`
      );

      // Fetch translations from our API service
      const { translation } = await fetchTranslations(lng, false); // Use cache when possible

      console.log(`ApiBackend: Successfully loaded translations for ${lng}`);
      console.log(
        `ApiBackend: Available top-level keys:`,
        Object.keys(translation)
      );

      // Return the flattened translation object for the namespace
      callback(null, translation);
    } catch (error) {
      console.error(
        `ApiBackend: Failed to load translations for ${lng}:`,
        error
      );
      // Provide minimal fallback to prevent empty UI
      const fallbackTranslations = {
        'navigation.title': lng === 'et' ? 'Eesti Anagrammide Leidja' : 'Estonian Anagram Finder',
        'navigation.subtitle': lng === 'et' ? 'Leia sõnade anagramme kiirelt ja lihtsalt' : 'Find word anagrams quickly and easily',
        'common.search': lng === 'et' ? 'Otsi' : 'Search',
        'common.loading': lng === 'et' ? 'Laadimine...' : 'Loading...',
        'common.error': lng === 'et' ? 'Viga' : 'Error',
      };
      callback(null, fallbackTranslations);
    }
  },

  /**
   * Called by i18next when it needs to save translations (not used in our read-only setup)
   */
  create: (
    _lng: string,
    _ns: string,
    _key: string,
    _fallbackValue: string,
    callback?: (err: unknown) => void
  ) => {
    // We don't need to implement this for a read-only backend
    if (callback) callback(new Error("Saving translations not supported"));
  },
};

/**
 * Initialize i18next with our custom API backend
 * No local translations needed - everything comes from the API
 */
i18n
  .use(ApiBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("i18nextLng") || "et", // Default language, try localStorage first
    fallbackLng: "en", // Fallback to English if keys missing
    ns: ["translation"], // Namespace
    defaultNS: "translation", // Default namespace
    debug: typeof window !== 'undefined' && import.meta?.env?.DEV === true, // Debug mode in development
    interpolation: {
      escapeValue: false, // React already does XSS protection
    },
    react: {
      useSuspense: false, // Don't use suspense mode
    },
    backend: {}, // Our custom backend doesn't need extra options
    // Wait for API to load before considering i18n ready
    initImmediate: false,
  });

// Add event listener to automatically persist language changes
i18n.on('languageChanged', (lng: string) => {
  console.log(`Language changed to ${lng}, saving to localStorage`);
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
