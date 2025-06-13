import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Button, VStack, Badge } from "@chakra-ui/react";

const TranslationTest: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [loadingState, setLoadingState] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const [apiBackendCalls, setApiBackendCalls] = useState<string[]>([]);

  useEffect(() => {
    // Listen for i18n events
    const handleLoaded = () => {
      console.log("✅ i18n loaded successfully");
      setLoadingState("loaded");
    };

    const handleFailedLoading = () => {
      console.log("❌ i18n failed to load");
      setLoadingState("error");
    };

    i18n.on("loaded", handleLoaded);
    i18n.on("failedLoading", handleFailedLoading);

    // Capture console logs to show API backend activity
    const originalConsoleLog = console.log;
    console.log = (...args: unknown[]) => {
      const message = args.join(" ");
      if (message.includes("ApiBackend:")) {
        setApiBackendCalls((prev) => [...prev, message]);
      }
      originalConsoleLog(...args);
    };

    return () => {
      i18n.off("loaded", handleLoaded);
      i18n.off("failedLoading", handleFailedLoading);
      console.log = originalConsoleLog;
    };
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    console.log(`🌐 Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
    // Persist language selection to localStorage
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      bg="gray.50"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">
          🔧 Translation Test - API Backend
        </Text>

        <Box>
          <Badge
            colorScheme={
              loadingState === "loaded"
                ? "green"
                : loadingState === "error"
                ? "red"
                : "yellow"
            }
          >
            {loadingState === "loaded"
              ? "API Loaded"
              : loadingState === "error"
              ? "API Failed"
              : "Loading..."}
          </Badge>
        </Box>

        <Box>
          <Text fontWeight="semibold">Current Language: {i18n.language}</Text>
          <Button size="sm" mr={2} onClick={() => changeLanguage("et")}>
            Estonian
          </Button>
          <Button size="sm" onClick={() => changeLanguage("en")}>
            English
          </Button>
        </Box>

        <Box>
          <Text fontWeight="semibold">Sample Translations:</Text>
          <Text>• Navigation Title: {t("navigation.title")}</Text>
          <Text>• Search Button: {t("search.searchButton")}</Text>
          <Text>• About Title: {t("about.title")}</Text>
          <Text>• Common Loading: {t("common.loading")}</Text>
        </Box>

        {apiBackendCalls.length > 0 && (
          <Box>
            <Text fontWeight="semibold">API Backend Activity:</Text>
            <Box
              bg="black"
              color="green.300"
              p={2}
              borderRadius="md"
              fontSize="sm"
              fontFamily="mono"
            >
              {apiBackendCalls.slice(-5).map((call, index) => (
                <Text key={index}>{call}</Text>
              ))}
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default TranslationTest;
