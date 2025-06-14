import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Link,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  CheckCircleIcon,
  TimeIcon,
  StarIcon,
  InfoIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { apiService } from "../services/api"; // Ensure this path is correct
import type { WordbaseStatus } from "../types/api"; // Ensure this path is correct

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [wordbaseStatus, setWordbaseStatus] = useState<WordbaseStatus | null>(
    null
  );
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      setStatsError(null);
      try {
        const statusResponse = await apiService.getWordbaseStatus();
        if (statusResponse.success && statusResponse.data) {
          setWordbaseStatus(statusResponse.data);
        } else {
          setStatsError(t("errors.fetchError"));
        }
      } catch {
        setStatsError(t("errors.networkError"));
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, [t]);

  const features = [
    {
      title: t("about.features.items.fastSearch"),
      description: t("about.features.items.fastSearchDescription"),
      icon: TimeIcon,
    },
    {
      title: t("about.features.items.multilingualSupport"),
      description: t("about.features.items.multilingualSupportDescription"),
      icon: StarIcon,
    },
    {
      title: t("about.features.items.customDatabase"),
      description: t("about.features.items.customDatabaseDescription"),
      icon: CheckCircleIcon,
    },
    {
      title: t("about.features.items.modernInterface"),
      description: t("about.features.items.modernInterfaceDescription"),
      icon: InfoIcon,
    },
    {
      title: t("about.features.items.realTimeStats"),
      description: t("about.features.items.realTimeStatsDescription"),
      icon: StarIcon,
    },
  ];

  const techStack = {
    frontend: [
      t("about.techStack.frontend.items.reactTypeScript"),
      t("about.techStack.frontend.items.chakraUI"),
      t("about.techStack.frontend.items.reactRouter"),
      t("about.techStack.frontend.items.reactHookForm"),
      t("about.techStack.frontend.items.i18next"),
      t("about.techStack.frontend.items.axios"),
      t("about.techStack.frontend.items.zod"),
    ],
    backend: [
      t("about.techStack.backend.items.laravel"),
      t("about.techStack.backend.items.restfulAPI"),
      t("about.techStack.backend.items.sqlite"),
      t("about.techStack.backend.items.multiLanguage"),
      t("about.techStack.backend.items.algorithms"),
      t("about.techStack.backend.items.errorHandling"),
      t("about.techStack.backend.items.monitoring"),
    ],
  };

  const algorithms = [
    {
      name: t("about.algorithm.types.characterFrequency.name"),
      description: t("about.algorithm.types.characterFrequency.description"),
      complexity: t("about.algorithm.types.characterFrequency.complexity"),
    },
    {
      name: t("about.algorithm.types.sortingBased.name"),
      description: t("about.algorithm.types.sortingBased.description"),
      complexity: t("about.algorithm.types.sortingBased.complexity"),
    },
    {
      name: t("about.algorithm.types.hashBased.name"),
      description: t("about.algorithm.types.hashBased.description"),
      complexity: t("about.algorithm.types.hashBased.complexity"),
    },
  ];

  return (
    <VStack gap={8} align="stretch">
      <Box textAlign="center">
        <Heading size="2xl" mb={4}>
          {t("about.title")}
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
          {t("about.description")}
        </Text>
      </Box>

      {/* Features */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <VStack gap={6}>
          <Heading size="lg">{t("about.features.title")}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
            {features.map((feature, index) => (
              <HStack key={index} gap={4} align="start">
                <Icon
                  as={feature.icon}
                  color="estonian.blue.500"
                  boxSize={6}
                  mt={1}
                />
                <VStack align="start" gap={1}>
                  <Text fontWeight="semibold">{feature.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {feature.description}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Production Statistics */}
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
          {isLoadingStats ? (
            <Spinner size="lg" color="blue.500" />
          ) : statsError ? (
            <Text color="red.600">{statsError}</Text>
          ) : wordbaseStatus ? (
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
          ) : (
            <Text>{t("errors.noData")}</Text>
          )}
        </VStack>
      </Box>

      {/* Algorithm Information */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <VStack gap={6}>
          <Heading size="lg">{t("about.algorithm.title")}</Heading>
          <Text textAlign="center" color="gray.600" maxW="2xl">
            {t("about.algorithm.description")}
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} w="full">
            {algorithms.map((algorithm, index) => (
              <Box
                key={index}
                p={4}
                bg="gray.50"
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
              >
                <VStack gap={3} align="start">
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold" fontSize="sm">
                      {algorithm.name}
                    </Text>
                    <Badge colorScheme="blue" size="sm">
                      {algorithm.complexity}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.600">
                    {algorithm.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Technology Stack */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
        >
          <VStack gap={4} align="start">
            <Heading size="md" color="estonian.blue.500">
              {t("about.techStack.frontend.title")}
            </Heading>
            <VStack align="start" gap={2}>
              {techStack.frontend.map((tech, index) => (
                <Text key={index} fontSize="sm">
                  • {tech}
                </Text>
              ))}
            </VStack>
          </VStack>
        </Box>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
        >
          <VStack gap={4} align="start">
            <Heading size="md" color="estonian.blue.500">
              {t("about.techStack.backend.title")}
            </Heading>
            <VStack align="start" gap={2}>
              {techStack.backend.map((tech, index) => (
                <Text key={index} fontSize="sm">
                  • {tech}
                </Text>
              ))}
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Getting Started */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <VStack gap={6} align="start">
          <Heading size="lg">{t("about.gettingStarted.title")}</Heading>
          <VStack gap={4} align="start" w="full">
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                1
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">
                  {t("about.gettingStarted.steps.importDatabase.title")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("about.gettingStarted.steps.importDatabase.description")}
                </Text>
              </VStack>
            </HStack>
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                2
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">
                  {t("about.gettingStarted.steps.searchAnagrams.title")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("about.gettingStarted.steps.searchAnagrams.description")}
                </Text>
              </VStack>
            </HStack>
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                3
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">
                  {t("about.gettingStarted.steps.exploreAnalyze.title")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("about.gettingStarted.steps.exploreAnalyze.description")}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* API Documentation */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <VStack gap={4} align="start">
          <Heading size="lg">{t("about.apiDocumentation.title")}</Heading>
          <Text fontSize="sm" color="gray.600">
            {t("about.apiDocumentation.description")}
          </Text>
          <VStack align="start" gap={2}>
            <Text fontSize="sm">{t("about.apiDocumentation.linkLabel")}</Text>
            <Link
              href="https://anagram-finder-api-9dc5f9cdb303.herokuapp.com/api/documentation"
              color="estonian.blue.500"
              fontSize="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("about.apiDocumentation.viewDocs")}{" "}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AboutPage;
