// Translation Key Verification Script
// Run this in the browser console to see exactly what's missing

console.log("🔍 Translation Key Analysis Starting...");

// List of all translation keys your React app is trying to use
const expectedKeys = [
  // From console errors - missing keys
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

  // Additional keys that might be needed
  "search.title",
  "search.searchButton",
  "search.placeholder",
  "search.noResults",
  "wordbase.status",
  "about.title",
  "errors.networkError",
  "errors.serverError",
];

// Function to test all keys
function verifyTranslationKeys() {
  const i18n = window.i18next;
  if (!i18n) {
    console.error("❌ i18next not found on window");
    return;
  }

  console.log("📊 Current Language:", i18n.language);

  const existingKeys = [];
  const missingKeys = [];

  expectedKeys.forEach((key) => {
    const value = i18n.t(key);
    const keyExists = value !== key; // i18next returns key if missing

    if (keyExists) {
      existingKeys.push(key);
      console.log(`✅ ${key}: "${value}"`);
    } else {
      missingKeys.push(key);
      console.log(`❌ ${key}: MISSING`);
    }
  });

  console.log("\n📈 SUMMARY:");
  console.log(`✅ Found: ${existingKeys.length} keys`);
  console.log(`❌ Missing: ${missingKeys.length} keys`);

  if (missingKeys.length > 0) {
    console.log("\n🔧 Missing Keys to Add to Laravel API:");
    missingKeys.forEach((key) => {
      console.log(`- ${key}`);
    });
  } else {
    console.log("\n🎉 All translation keys are working!");
  }

  return {
    existing: existingKeys,
    missing: missingKeys,
    total: expectedKeys.length,
  };
}

// Export for use
window.verifyTranslationKeys = verifyTranslationKeys;

console.log("🎯 Run verifyTranslationKeys() to check all translation keys");

export default verifyTranslationKeys;
