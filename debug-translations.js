// Translation debugging script for Estonian Anagram Finder
// Run this in browser console to debug translation loading

console.log("🔍 Starting translation debugging...");

// Test direct API call
async function testApiTranslations() {
  console.log("📡 Testing direct API translation calls...");

  try {
    // Test English
    const enResponse = await fetch(
      "https://anagram-finder-api-9dc5f9cdb303.herokuapp.com/api/v1/locale/translations/api?locale=en"
    );
    const enData = await enResponse.json();
    console.log(
      "✅ English API response:",
      enData.data.translations.navigation
    );

    // Test Estonian
    const etResponse = await fetch(
      "https://anagram-finder-api-9dc5f9cdb303.herokuapp.com/api/v1/locale/translations/api?locale=et"
    );
    const etData = await etResponse.json();
    console.log(
      "✅ Estonian API response:",
      etData.data.translations.navigation
    );

    return { en: enData.data.translations, et: etData.data.translations };
  } catch (error) {
    console.error("❌ API translation test failed:", error);
    return null;
  }
}

// Test i18next state
function testI18nextState() {
  console.log("🧩 Testing i18next state...");

  if (typeof window !== "undefined" && window.i18n) {
    const i18n = window.i18n;
    console.log("✅ i18next instance found");
    console.log("🌍 Current language:", i18n.language);
    console.log("📚 Loaded namespaces:", i18n.options.ns);
    console.log("🔧 Is initialized:", i18n.isInitialized);

    // Test specific keys
    const testKeys = [
      "navigation.title",
      "navigation.subtitle",
      "common.search",
      "search.title",
    ];

    console.log("🔑 Testing translation keys:");
    testKeys.forEach((key) => {
      const value = i18n.t(key);
      console.log(`  ${key}: "${value}"`);
    });

    return i18n;
  } else {
    console.error("❌ i18next instance not found on window");
    return null;
  }
}

// Test React i18next hook simulation
function testReactI18next() {
  console.log("⚛️ Testing React i18next integration...");

  if (typeof window !== "undefined" && window.useTranslation) {
    console.log("✅ useTranslation hook available");
    // This would require React context, so just log availability
  } else {
    console.log(
      "ℹ️ useTranslation hook not directly accessible (normal in production)"
    );
  }
}

// Main debugging function
async function debugTranslations() {
  console.log("🚀 Estonian Anagram Finder - Translation Debug Report");
  console.log("=".repeat(60));

  // Test API
  const apiResult = await testApiTranslations();
  console.log("");

  // Test i18next
  const i18nResult = testI18nextState();
  console.log("");

  // Test React integration
  testReactI18next();
  console.log("");

  // Summary
  console.log("📋 Summary:");
  console.log("  API Translations:", apiResult ? "✅ Working" : "❌ Failed");
  console.log("  i18next Setup:", i18nResult ? "✅ Working" : "❌ Failed");

  if (apiResult && i18nResult) {
    console.log(
      "🎉 Translations should be working! If you see translation keys in the UI, check:"
    );
    console.log("  1. Network tab for failed translation API calls");
    console.log("  2. Console for i18next initialization errors");
    console.log("  3. React component mounting order");
  }

  return { api: apiResult, i18n: i18nResult };
}

// Auto-run debugging
debugTranslations();

// Export for manual testing
window.debugTranslations = debugTranslations;
console.log("💡 Run debugTranslations() anytime to re-test translations");
