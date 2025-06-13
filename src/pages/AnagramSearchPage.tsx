import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Search, Clock, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiService } from "../services/api";
import type { AnagramResponse } from "../types/api";

// Form schema
const searchSchema = z.object({
  word: z
    .string()
    .min(2, "Word must be at least 2 characters")
    .max(50, "Word must be less than 50 characters"),
});

type SearchFormData = z.infer<typeof searchSchema>;

const AnagramSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchResult, setSearchResult] = useState<AnagramResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const currentWord = watch("word");

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const response = await apiService.searchAnagrams(
        data.word.trim().toLowerCase()
      );

      if (response.success && response.data) {
        setSearchResult(response.data);
        // Add to search history
        setSearchHistory((prev) =>
          [
            data.word.trim().toLowerCase(),
            ...prev.filter((w) => w !== data.word.trim().toLowerCase()),
          ].slice(0, 10)
        );
        // Don't show error if no anagrams found - this is a valid result
      } else {
        setError(response.error?.message || t("errors.networkError"));
      }
    } catch {
      setError(t("errors.networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (word: string) => {
    setValue("word", word);
    handleSubmit(onSubmit)();
  };

  return (
    <VStack gap={8} align="stretch">
      <Box textAlign="center">
        <Heading size="xl" mb={2}>
          {t("search.title")}
        </Heading>
        <Text color="gray.600">
          {t("search.description")}
        </Text>
      </Box>

      {/* Search Form */}
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={6}>
              <FormControl isInvalid={!!errors.word}>
                <FormLabel>{t("search.placeholder")}</FormLabel>
                <HStack>
                  <Input
                    {...register("word")}
                    placeholder={t("search.placeholder")}
                    size="lg"
                  />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    isLoading={isLoading}
                    loadingText="Searching..."
                    isDisabled={!currentWord || currentWord.length < 2}
                    leftIcon={<Search size={20} />}
                  >
                    {t("search.searchButton")}
                  </Button>
                </HStack>
                <FormErrorMessage>
                  {errors.word && errors.word.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </form>
        </CardBody>
      </Card>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card>
          <CardHeader>
            <Heading size="md">{t("search.recentSearches")}</Heading>
          </CardHeader>
          <CardBody>
            <HStack gap={2} wrap="wrap">
              {searchHistory.map((word, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => handleHistoryClick(word)}
                  _hover={{ bg: "blue.50" }}
                  px={3}
                  py={1}
                >
                  {word}
                </Badge>
              ))}
            </HStack>
          </CardBody>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardBody>
            <VStack gap={4}>
              <Spinner size="xl" color="blue.500" />
              <Text>{t("common.loading")}</Text>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert status="error">
          <AlertIcon as={AlertCircle} />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search Results */}
      {searchResult && !isLoading && (
        <Card>
          <CardHeader>
            <VStack gap={2} align="start">
              <HStack>
                <Heading size="lg">{t("search.results.title")}</Heading>
                <Badge colorScheme="blue" size="lg">
                  {searchResult.original_word || searchResult.word}
                </Badge>
              </HStack>

              <HStack gap={4} fontSize="sm" color="gray.600">
                <Text fontWeight="medium">
                  {t("search.results.count", { count: searchResult.count })}
                </Text>
                {searchResult.execution_time && (
                  <HStack>
                    <Clock size={16} />
                    <Text>
                      {t("search.results.executionTime", {
                        time: searchResult.execution_time,
                      })}
                    </Text>
                  </HStack>
                )}
                {searchResult.algorithm_used && (
                  <Badge variant="outline" colorScheme="gray">
                    {searchResult.algorithm_used}
                  </Badge>
                )}
              </HStack>
            </VStack>
          </CardHeader>

          <CardBody>
            {searchResult.anagrams.length > 0 ? (
              <>
                <Divider mb={4} />
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={3}>
                  {searchResult.anagrams.map((anagram, index) => (
                    <Card
                      key={index}
                      size="sm"
                      variant="outline"
                      _hover={{
                        borderColor: "blue.300",
                        transform: "translateY(-1px)",
                      }}
                      transition="all 0.2s"
                      cursor="pointer"
                      onClick={() => handleHistoryClick(anagram)}
                    >
                      <CardBody textAlign="center">
                        <Text fontWeight="medium" fontSize="lg">
                          {anagram}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </>
            ) : (
              <VStack gap={4} py={8}>
                <Text fontSize="lg" color="gray.500">
                  {t("search.noResults")}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  No anagrams found for "
                  {searchResult.original_word || searchResult.word}"
                </Text>
              </VStack>
            )}
          </CardBody>
        </Card>
      )}

      {/* Tips */}
      <Card bg="blue.50" borderColor="blue.200">
        <CardBody>
          <VStack gap={3} align="start">
            <Heading size="sm" color="blue.700">
              {t("search.tips.title")}
            </Heading>
            <VStack gap={2} align="start" fontSize="sm" color="blue.600">
              <Text>• {t("search.tips.items.estonianWords")}</Text>
              <Text>• {t("search.tips.items.minimumLength")}</Text>
              <Text>• {t("search.tips.items.clickResults")}</Text>
              <Text>• {t("search.tips.items.useHistory")}</Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default AnagramSearchPage;
