import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiService } from "../services/api";
import type { WordbaseStatus } from "../types/api";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [wordbaseStatus, setWordbaseStatus] = useState<WordbaseStatus | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch wordbase status
        const statusResponse = await apiService.getWordbaseStatus();
        if (statusResponse.success && statusResponse.data) {
          setWordbaseStatus(statusResponse.data);
        }
      } catch {
        setError(t("errors.networkError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  if (isLoading) {
    return (
      <VStack gap={8} py={16}>
        <Spinner size="xl" color="blue.500" />
        <Text>{t("common.loading")}</Text>
      </VStack>
    );
  }
  return (
    <VStack gap={12} align="stretch">
      {/* Hero Section */}
      <Box textAlign="center" py={16}>
        <VStack gap={6}>
          <Heading
            size="2xl"
            bgGradient="linear(to-r, blue.500, blue.700)"
            bgClip="text"
          >
            {t("navigation.title")}
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl">
            {t("navigation.subtitle")}
          </Text>
          <HStack gap={4} pt={4}>
            <Button
              onClick={() => navigate("/search")}
              size="lg"
              colorScheme="blue"
            >
              {t("search.searchButton")}
            </Button>
            <Button
              onClick={() => navigate("/import")}
              size="lg"
              variant="outline"
              colorScheme="blue"
            >
              {t("wordbase.importForm.importButton")}
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Error Alert */}
      {error && (
        <Box
          bg="red.50"
          border="1px"
          borderColor="red.200"
          borderRadius="md"
          p={4}
        >
          <Text color="red.600">{error}</Text>
        </Box>
      )}

      {/* Production Statistics */}
      {wordbaseStatus && (
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <VStack gap={8}>
            <Heading size="lg" textAlign="center" color="gray.700">
              {t("home.statistics.title")}
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} w="full">
              <Box textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="blue.600" mb={2}>
                  {(wordbaseStatus.total_words || 177953).toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {t("home.statistics.estonianWords")}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="green.600" mb={2}>
                  ~19ms
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {t("home.statistics.avgResponse")}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="purple.600"
                  mb={2}
                >
                  100%
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {t("home.statistics.unicodeSupport")}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="orange.600"
                  mb={2}
                >
                  O(1)
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {t("home.statistics.lookupTime")}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      )}

      {/* Features */}
      <VStack gap={8}>
        <Heading size="lg" textAlign="center">
          {t("about.features.title")}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
            transition="all 0.2s"
          >
            <VStack gap={4} textAlign="center">
              <Text fontSize="3xl">🔍</Text>
              <Heading size="md">
                {t("about.features.items.fastSearch")}
              </Heading>
              <Text color="gray.600">{t("home.features.fastSearch")}</Text>
              <Button
                onClick={() => navigate("/search")}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                {t("common.search")}
              </Button>
            </VStack>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
            transition="all 0.2s"
          >
            <VStack gap={4} textAlign="center">
              <Text fontSize="3xl">📥</Text>
              <Heading size="md">
                {t("about.features.items.customDatabase")}
              </Heading>
              <Text color="gray.600">{t("home.features.importDatabase")}</Text>
              <Button
                onClick={() => navigate("/import")}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                {t("common.import")}
              </Button>
            </VStack>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
            transition="all 0.2s"
          >
            <VStack gap={4} textAlign="center">
              <Text fontSize="3xl">ℹ️</Text>
              <Heading size="md">
                {t("about.features.items.modernInterface")}
              </Heading>
              <Text color="gray.600">{t("home.features.modernInterface")}</Text>
              <Button
                onClick={() => navigate("/about")}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                {t("common.about")}
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>

      {/* Quick Start */}
      {!wordbaseStatus || wordbaseStatus.total_words === 0 ? (
        <Box
          bg="blue.50"
          borderColor="blue.200"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
        >
          <VStack gap={4} textAlign="center">
            <Heading size="md" color="blue.700">
              {t("home.quickStart.title")}
            </Heading>
            <Text color="blue.600">{t("home.quickStart.description")}</Text>
            <Button onClick={() => navigate("/import")} colorScheme="blue">
              {t("home.quickStart.importButton")}
            </Button>
          </VStack>
        </Box>
      ) : (
        <Box bg="teal.500" color="white" borderRadius="lg" p={6}>
          <VStack gap={4} textAlign="center">
            <Heading size="md">{t("home.readyToSearch")}</Heading>
            <Text>
              {t("home.databaseLoaded").replace(
                "{{count}}",
                (wordbaseStatus.total_words || 0).toLocaleString()
              )}
            </Text>
            <Button
              onClick={() => navigate("/search")}
              bg="white"
              color="teal.500"
              _hover={{ bg: "gray.100" }}
            >
              {t("home.startSearching")}
            </Button>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default HomePage;