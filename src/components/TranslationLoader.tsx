import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Spinner, VStack, Text } from "@chakra-ui/react";

interface TranslationLoaderProps {
  children: React.ReactNode;
}

const TranslationLoader: React.FC<TranslationLoaderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkReady = () => {
      // Check if i18n is initialized and has loaded translations
      const hasTranslations = i18n.hasLoadedNamespace("translation");
      const isInitialized = i18n.isInitialized;

      console.log("TranslationLoader: Checking readiness...", {
        isInitialized,
        hasTranslations,
        language: i18n.language,
        loadedLanguages: i18n.languages,
      });

      if (isInitialized && hasTranslations) {
        setIsReady(true);
      }
    };

    // Check immediately
    checkReady();

    // Listen for i18n events
    const handleInitialized = () => {
      console.log("TranslationLoader: i18next initialized");
      checkReady();
    };

    const handleLoaded = () => {
      console.log("TranslationLoader: Translations loaded");
      checkReady();
    };

    const handleLanguageChanged = (lng: string) => {
      console.log("TranslationLoader: Language changed to", lng);
      checkReady();
    };

    i18n.on("initialized", handleInitialized);
    i18n.on("loaded", handleLoaded);
    i18n.on("languageChanged", handleLanguageChanged);

    // Cleanup
    return () => {
      i18n.off("initialized", handleInitialized);
      i18n.off("loaded", handleLoaded);
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  if (!isReady) {
    return (
      <VStack gap={4} py={16} align="center">
        <Spinner size="xl" color="blue.500" />
        <Text color="gray.600">Loading translations...</Text>
        <Text fontSize="sm" color="gray.400">
          Fetching content from API...
        </Text>
      </VStack>
    );
  }

  return <>{children}</>;
};

export default TranslationLoader;
