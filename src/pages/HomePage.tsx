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
import type { WordbaseStatus, AnagramStats } from "../types/api";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [wordbaseStatus, setWordbaseStatus] = useState<WordbaseStatus | null>(
    null
  );
  const [anagramStats, setAnagramStats] = useState<AnagramStats | null>(null);
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

        // Fetch anagram stats if wordbase is available
        if (statusResponse.data && statusResponse.data.total_words > 0) {
          const statsResponse = await apiService.getAnagramStats();
          if (statsResponse.success && statsResponse.data) {
            setAnagramStats(statsResponse.data);
          }
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

      {/* Statistics */}
      {wordbaseStatus && (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
          <VStack gap={6}>
            <Heading size="lg" textAlign="center">
              {t("wordbase.status")}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              <Box textAlign="center">
                <Text fontSize="sm" color="gray.500">
                  Total Words
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {(wordbaseStatus.total_words || 0).toLocaleString()}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  in database
                </Text>
              </Box>

              {anagramStats && (
                <>
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Unique Anagrams
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                      {(
                        anagramStats.total_unique_anagrams || 0
                      ).toLocaleString()}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      combinations
                    </Text>
                  </Box>

                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Most Anagrams
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                      {anagramStats.most_anagrams?.count || 0}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      for "{anagramStats.most_anagrams?.word || "N/A"}"
                    </Text>
                  </Box>

                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Avg Search Time
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">
                      {(
                        anagramStats.algorithm_performance?.average_time || 0
                      ).toFixed(2)}
                      ms
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      per search
                    </Text>
                  </Box>
                </>
              )}
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
              <Heading size="md">{t("about.features.items.0")}</Heading>
              <Text color="gray.600">
                Optimized algorithms for instant anagram detection
              </Text>
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
              <Heading size="md">{t("about.features.items.2")}</Heading>
              <Text color="gray.600">
                Import your own word lists to customize the search database
              </Text>
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
              <Heading size="md">{t("about.features.items.3")}</Heading>
              <Text color="gray.600">
                Modern, responsive interface built with React and Chakra UI
              </Text>
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
              Get Started
            </Heading>
            <Text color="blue.600">
              To begin finding anagrams, you'll need to import a word database
              first.
            </Text>
            <Button onClick={() => navigate("/import")} colorScheme="blue">
              Import Word Database
            </Button>
          </VStack>
        </Box>
      ) : (
        <Box bg="teal.500" color="white" borderRadius="lg" p={6}>
          <VStack gap={4} textAlign="center">
            <Heading size="md">Ready to Search!</Heading>
            <Text>
              Your word database is loaded with{" "}
              {(wordbaseStatus.total_words || 0).toLocaleString()} words. Start
              finding anagrams now!
            </Text>
            <Button
              onClick={() => navigate("/search")}
              bg="white"
              color="teal.500"
              _hover={{ bg: "gray.100" }}
            >
              Start Searching
            </Button>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default HomePage;
