import i18n from "./i18n/config";

// Debug function to check translation status
export const debugTranslations = () => {
  console.log("=== Translation Debug Info ===");
  console.log("Current language:", i18n.language);
  console.log("Available languages:", i18n.languages);
  console.log("Fallback language:", i18n.options.fallbackLng);

  // Test specific keys
  const testKeys = [
    "wordbase.status",
    "footer.copyright",
    "navigation.title",
    "common.search",
    "wordbase.importForm.importButton",
  ];

  console.log("Translation tests:");
  testKeys.forEach((key) => {
    const value = i18n.t(key);
    console.log(`  ${key}: "${value}"`);
  });

  // Check raw resource data
  console.log(
    "Raw resources for current language:",
    i18n.getDataByLanguage(i18n.language)
  );

  console.log("===============================");
};

// Make it available globally for browser console testing
declare global {
  interface Window {
    debugTranslations: typeof debugTranslations;
  }
}
window.debugTranslations = debugTranslations;
