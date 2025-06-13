import { apiService } from "./api";
import type { TranslationSet } from "../types/translations";

// Cache for translations to avoid repeated API calls
const translationCache: Record<string, TranslationSet> = {};

/**
 * Translation Service
 *
 * This service primarily uses API translations from the Laravel backend.
 * The API provides comprehensive translations in multiple languages (en, et, de, fr).
 * A minimal fallback is provided only for critical UI elements in case the API is unavailable.
 */

/**
 * Structure API translations to match the expected i18next format
 */
const structureApiTranslations = (
  apiTranslations: Record<string, unknown>
): Record<string, unknown> => {
  // The API provides the correct nested structure, return as-is
  return apiTranslations;
};

/**
 * Fetch translations from the API
 */
export const fetchTranslations = async (
  language: string,
  forceRefresh: boolean = false
): Promise<TranslationSet> => {
  console.log(
    `fetchTranslations called for language: ${language}, forceRefresh: ${forceRefresh}`
  );

  // Check cache first to avoid repeated API calls (unless force refresh is requested)
  if (!forceRefresh && translationCache[language]) {
    console.log(`Using cached translations for ${language}`);
    return translationCache[language];
  }

  try {
    console.log(`Fetching translations from API for ${language}...`);
    // Fetch translations from the API's locale endpoint with language parameter
    const response = await apiService.getTranslations("api", language);
    console.log(`API response for ${language}:`, response);

    if (response.success && response.data?.data) {
      console.log(`Successfully received translations for ${language}`);

      // Structure the translations in the expected format for i18next
      const apiTranslations = response.data.data as Record<string, unknown>;
      const translations: TranslationSet = {
        translation: structureApiTranslations(apiTranslations),
      };

      console.log(
        `Translations loaded successfully for ${language} with ${
          Object.keys(translations.translation).length
        } top-level keys`
      );

      // Log about section specifically for debugging
      const translationObj = translations.translation as Record<
        string,
        unknown
      >;
      if (translationObj.about) {
        console.log(
          `About section found for ${language}:`,
          translationObj.about
        );
      } else {
        console.log(`No about section found for ${language}`);
      }

      translationCache[language] = translations;
      return translations;
    } else {
      console.warn(
        `API returned unsuccessful response for ${language}:`,
        response
      );
      // Return minimal fallback instead of comprehensive hardcoded translations
      return getMinimalFallbackTranslations(language);
    }
  } catch (error) {
    console.warn(`Failed to fetch translations for ${language}:`, error);
    // Return minimal fallback instead of comprehensive hardcoded translations
    return getMinimalFallbackTranslations(language);
  }
};

/**
 * Get minimal fallback translations when API is unavailable
 * Only provides essential translations to keep the app functional
 */
const getMinimalFallbackTranslations = (language: string): TranslationSet => {
  const isEstonian = language === "et";

  // Minimal translations - just the essentials to prevent app crashes
  return {
    translation: {
      common: {
        search: isEstonian ? "Otsing" : "Search",
        import: isEstonian ? "Impordi" : "Import",
        about: isEstonian ? "Teave" : "About",
        home: isEstonian ? "Avaleht" : "Home",
        loading: isEstonian ? "Laadimine..." : "Loading...",
        error: isEstonian ? "Viga" : "Error",
      },
      navigation: {
        title: isEstonian
          ? "Eesti anagrammide otsija"
          : "Estonian Anagram Finder",
      },
      search: {
        title: isEstonian ? "Anagrammide otsing" : "Anagram Search",
        placeholder: isEstonian
          ? "Sisesta sõna anagrammide leidmiseks..."
          : "Enter a word to find anagrams...",
        searchButton: isEstonian ? "Otsi Anagramme" : "Search Anagrams",
        noResults: isEstonian ? "Anagramme ei leitud" : "No anagrams found",
      },
      wordbase: {
        title: isEstonian ? "Sõnabaasi import" : "Wordbase Import",
        status: isEstonian ? "Sõnabaasi olek" : "Wordbase Status",
      },
      about: {
        title: isEstonian ? "Anagrammide otsija kohta" : "About Anagram Finder",
      },
      errors: {
        networkError: isEstonian
          ? "Võrguühenduse viga"
          : "Network connection error",
        serverError: isEstonian ? "Serveri viga" : "Server error",
        translationLoadError: isEstonian
          ? "Tõlgete laadimine ebaõnnestus. Kasutan minimaalseid tõlkeid."
          : "Failed to load translations. Using minimal translations.",
      },
      footer: {
        copyright: isEstonian
          ? "2025 Eesti anagrammide otsija. Tehtud ❤️ eesti keele jaoks."
          : "2025 Estonian Anagram Finder. Made with ❤️ for Estonian language.",
      },
    },
  };
};

/**
 * Clear translation cache for all languages
 */
export const clearTranslationCache = (): void => {
  Object.keys(translationCache).forEach((key) => {
    delete translationCache[key];
  });
  console.log("Translation cache cleared");
};

/**
 * Force refresh translations for a specific language
 */
export const refreshTranslations = async (
  language: string
): Promise<TranslationSet> => {
  console.log(`Force refreshing translations for ${language}`);
  return await fetchTranslations(language, true);
};

export default {
  fetchTranslations,
  clearTranslationCache,
  refreshTranslations,
};
