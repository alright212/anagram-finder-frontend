/**
 * Debug script to check what translations your API actually returns
 * Open browser console and run this to see the discrepancy
 */

// Function to check missing translation keys
window.debugTranslations = () => {
  console.log("🔍 Debugging Translation Keys vs API Response");

  // Keys that your app is trying to use (from the missing key errors)
  const expectedKeys = [
    "common.home",
    "common.search",
    "common.import",
    "common.about",
    "navigation.title",
    "navigation.subtitle",
    "footer.copyright",
    "common.loading",
    "wordbase.importForm.importButton",
    "home.statistics.totalWords",
    "home.statistics.inDatabase",
    "home.statistics.uniqueAnagrams",
    "home.statistics.combinations",
    "home.statistics.mostAnagrams",
    "home.statistics.for",
    "home.statistics.avgSearchTime",
    "home.statistics.perSearch",
    "about.features.title",
    "about.features.items.fastSearch",
    "home.features.fastSearch",
    "about.features.items.customDatabase",
    "home.features.importDatabase",
    "about.features.items.modernInterface",
    "home.features.modernInterface",
    "home.readyToSearch",
    "home.databaseLoaded",
    "home.startSearching",
  ];

  // Get current i18n instance
  const i18n = window.i18next || window.i18n;
  if (!i18n) {
    console.error("❌ i18next not found on window");
    return;
  }

  console.log("📊 Current Language:", i18n.language);
  console.log("📦 Translation Store:", i18n.store.data);

  // Check what's actually in the translation store
  const currentLang = i18n.language || "et";
  const translations = i18n.store.data[currentLang]?.translation || {};

  console.log("✅ Available Translations:", translations);

  // Check each expected key
  console.log("\n🔎 Key Analysis:");
  expectedKeys.forEach((key) => {
    const value = i18n.t(key);
    const exists = value !== key; // i18next returns the key if translation missing

    console.log(`${exists ? "✅" : "❌"} ${key}: "${value}"`);
  });

  // Helper function to recursively get all keys from an object
  const getAllKeys = (obj, prefix = "") => {
    let keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  };

  const actualKeys = getAllKeys(translations);
  console.log("\n📋 All Available Keys:", actualKeys);

  const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
  console.log("\n❌ Missing Keys:", missingKeys);

  console.log(
    "\n🎯 Quick Fix: Add these missing keys to your Laravel API translations!"
  );
};

// Auto-run when loaded
console.log(
  "🔧 Debug helper loaded. Run debugTranslations() in console to analyze translations."
);

export default window.debugTranslations;
