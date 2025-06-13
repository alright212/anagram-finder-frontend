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
  SimpleGrid,
  Badge,
  Alert,
  Spinner,
  Field,
  Separator,
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
      } else {
        setError(response.error?.message || t("errors.wordNotFound"));
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
          Enter an Estonian word to find its anagrams
        </Text>
      </Box>

      {/* Search Form */}
      <Card.Root>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={6}>
              <Field.Root invalid={!!errors.word}>
                <Field.Label>{t("search.placeholder")}</Field.Label>
                <HStack>
                  <Input
                    {...register("word")}
                    placeholder={t("search.placeholder")}
                    size="lg"
                  />
                  <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    loading={isLoading}
                    loadingText="Searching..."
                    disabled={!currentWord || currentWord.length < 2}
                  >
                    <Search size={20} />
                    {t("search.searchButton")}
                  </Button>
                </HStack>
                {errors.word && (
                  <Field.ErrorText>{errors.word.message}</Field.ErrorText>
                )}
              </Field.Root>
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card.Root>
          <Card.Header>
            <Heading size="md">Recent Searches</Heading>
          </Card.Header>
          <Card.Body>
            <HStack gap={2} wrap="wrap">
              {searchHistory.map((word, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  colorPalette="blue"
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
          </Card.Body>
        </Card.Root>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card.Root>
          <Card.Body>
            <VStack gap={4}>
              <Spinner size="xl" colorPalette="blue" />
              <Text>{t("common.loading")}</Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      )}

      {/* Error State */}
      {error && (
        <Alert.Root status="error">
          <Alert.Indicator>
            <AlertCircle />
          </Alert.Indicator>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Root>
      )}

      {/* Search Results */}
      {searchResult && !isLoading && (
        <Card.Root>
          <Card.Header>
            <VStack gap={2} align="start">
              <HStack>
                <Heading size="lg">{t("search.results.title")}</Heading>
                <Badge colorPalette="blue" size="lg">
                  {searchResult.word}
                </Badge>
              </HStack>

              <HStack gap={4} fontSize="sm" color="gray.600">
                <Text fontWeight="medium">
                  {t("search.results.count", { count: searchResult.count })}
                </Text>
                <HStack>
                  <Clock size={16} />
                  <Text>
                    {t("search.results.executionTime", {
                      time: searchResult.execution_time,
                    })}
                  </Text>
                </HStack>
                <Badge variant="outline" colorPalette="gray">
                  {searchResult.algorithm_used}
                </Badge>
              </HStack>
            </VStack>
          </Card.Header>

          <Card.Body>
            {searchResult.anagrams.length > 0 ? (
              <>
                <Separator mb={4} />
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={3}>
                  {searchResult.anagrams.map((anagram, index) => (
                    <Card.Root
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
                      <Card.Body textAlign="center">
                        <Text fontWeight="medium" fontSize="lg">
                          {anagram}
                        </Text>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              </>
            ) : (
              <VStack gap={4} py={8}>
                <Text fontSize="lg" color="gray.500">
                  {t("search.noResults")}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  No anagrams found for "{searchResult.word}"
                </Text>
              </VStack>
            )}
          </Card.Body>
        </Card.Root>
      )}

      {/* Tips */}
      <Card.Root bg="blue.50" borderColor="blue.200">
        <Card.Body>
          <VStack gap={3} align="start">
            <Heading size="sm" color="blue.700">
              💡 Search Tips
            </Heading>
            <VStack gap={2} align="start" fontSize="sm" color="blue.600">
              <Text>• Use Estonian words for best results</Text>
              <Text>• Words must be at least 2 characters long</Text>
              <Text>
                • Click on any anagram result to search for its anagrams
              </Text>
              <Text>• Use your recent searches for quick access</Text>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};

export default AnagramSearchPage;
