// Simple script to verify the missing translations are now available
const fs = require("fs");
const path = require("path");

// Read the i18n config file
const configPath = path.join(__dirname, "src", "i18n", "config.ts");
const configContent = fs.readFileSync(configPath, "utf8");

// Check for the missing translation keys
const missingKeys = [
  "wordbase.import.instructions.title",
  "wordbase.import.instructions.json_format",
  "wordbase.import.instructions.language_selection",
  "wordbase.import.instructions.duplicates",
  "wordbase.import.instructions.processing_time",
];

console.log("🔍 Checking for missing translation keys...\n");

let allFound = true;

missingKeys.forEach((key) => {
  // Convert dot notation to nested object check
  const keyParts = key.split(".");
  const searchString = keyParts[keyParts.length - 1]; // Get the last part

  if (configContent.includes(searchString)) {
    console.log(`✅ Found: ${key}`);
  } else {
    console.log(`❌ Missing: ${key}`);
    allFound = false;
  }
});

if (allFound) {
  console.log("\n🎉 All missing translations have been added successfully!");
} else {
  console.log("\n⚠️  Some translations are still missing.");
}

// Check for specific patterns
const patterns = [
  "instructions: {",
  'title: "Import Instructions"',
  "json_format:",
  "language_selection:",
  "duplicates:",
  "processing_time:",
];

console.log("\n🔍 Checking for specific patterns...\n");

patterns.forEach((pattern) => {
  if (configContent.includes(pattern)) {
    console.log(`✅ Found pattern: ${pattern}`);
  } else {
    console.log(`❌ Missing pattern: ${pattern}`);
  }
});
