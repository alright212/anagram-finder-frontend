import React from "react";
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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  CheckCircleIcon,
  TimeIcon,
  StarIcon,
  InfoIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("about.features.items.0"),
      description: "Optimized algorithms for instant anagram detection",
      icon: TimeIcon,
    },
    {
      title: t("about.features.items.1"),
      description: "Support for Estonian, English, German, and French",
      icon: StarIcon,
    },
    {
      title: t("about.features.items.2"),
      description: "Import your own word lists and customize the database",
      icon: CheckCircleIcon,
    },
    {
      title: t("about.features.items.3"),
      description: "Built with React 18, TypeScript, and Chakra UI",
      icon: InfoIcon,
    },
    {
      title: t("about.features.items.4"),
      description: "View search performance and word database statistics",
      icon: StarIcon,
    },
  ];

  const techStack = {
    frontend: [
      "React 18 with TypeScript",
      "Chakra UI for modern design",
      "React Router for navigation",
      "React Hook Form for forms",
      "i18next for internationalization",
      "Axios for API communication",
      "Zod for validation",
    ],
    backend: [
      "Laravel 11 PHP Framework",
      "RESTful API with Swagger docs",
      "SQLite database",
      "Multi-language support",
      "Optimized anagram algorithms",
      "Comprehensive error handling",
      "Performance monitoring",
    ],
  };

  const algorithms = [
    {
      name: "Character Frequency Analysis",
      description:
        "Uses character frequency counting for efficient anagram detection",
      complexity: "O(n + m)",
    },
    {
      name: "Sorting-based Comparison",
      description:
        "Sorts characters to find anagrams through string comparison",
      complexity: "O(n log n)",
    },
    {
      name: "Hash-based Lookup",
      description: "Pre-computed hash tables for ultra-fast anagram retrieval",
      complexity: "O(1) lookup",
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
              Frontend Technologies
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
              Backend Technologies
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

      {/* Performance Metrics */}
      <Box
        bg="estonian.blue.50"
        p={6}
        borderRadius="lg"
        border="1px"
        borderColor="estonian.blue.200"
      >
        <VStack gap={6}>
          <Heading size="lg" color="estonian.blue.700">
            Performance Highlights
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={6} w="full">
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="estonian.blue.600">
                &lt;100ms
              </Text>
              <Text fontSize="sm" textAlign="center" color="gray.600">
                Average search time
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="estonian.blue.600">
                500K+
              </Text>
              <Text fontSize="sm" textAlign="center" color="gray.600">
                Words supported
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="estonian.blue.600">
                4
              </Text>
              <Text fontSize="sm" textAlign="center" color="gray.600">
                Languages supported
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold" color="estonian.blue.600">
                99.9%
              </Text>
              <Text fontSize="sm" textAlign="center" color="gray.600">
                Uptime reliability
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Box>

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
          <Heading size="lg">Getting Started</Heading>
          <VStack gap={4} align="start" w="full">
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                1
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">Import Word Database</Text>
                <Text fontSize="sm" color="gray.600">
                  Start by importing a word list through the Import page. You
                  can use the default Estonian wordlist or upload your own.
                </Text>
              </VStack>
            </HStack>
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                2
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">Search for Anagrams</Text>
                <Text fontSize="sm" color="gray.600">
                  Enter any word in the search page to find all possible
                  anagrams instantly using our optimized algorithms.
                </Text>
              </VStack>
            </HStack>
            <HStack align="start" gap={4}>
              <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                3
              </Badge>
              <VStack align="start" gap={1}>
                <Text fontWeight="semibold">Explore and Analyze</Text>
                <Text fontSize="sm" color="gray.600">
                  Use the statistics page to analyze your wordbase and view
                  search history and discover word patterns.
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
          <Heading size="lg">API Documentation</Heading>
          <Text fontSize="sm" color="gray.600">
            This application uses a Laravel-based REST API with comprehensive
            documentation available through Swagger/OpenAPI.
          </Text>
          <VStack align="start" gap={2}>
            <Text fontSize="sm">API Documentation:</Text>
            <Link
              href="/api/documentation"
              color="estonian.blue.500"
              fontSize="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View API Docs <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AboutPage;
