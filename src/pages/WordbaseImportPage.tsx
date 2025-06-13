import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Textarea,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiService } from "../services/api";
import type { WordbaseStatus, WordbaseImportResponse } from "../types/api";

type ImportFormData = {
  words: string;
  format: "text" | "json";
  language: "et" | "en" | "de" | "fr";
};

const WordbaseImportPage: React.FC = () => {
  const { t } = useTranslation();

  // Create validation schema inside component to access translation
  const importSchema = z.object({
    words: z.string().min(1, t("wordbase.importForm.validation.wordsRequired")),
    format: z.enum(["text", "json"]),
    language: z.enum(["et", "en", "de", "fr"]),
  });
  const [currentStatus, setCurrentStatus] = useState<WordbaseStatus | null>(
    null
  );
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<WordbaseImportResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      format: "text",
      language: "et",
    },
  });

  // Fetch current wordbase status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await apiService.getWordbaseStatus();
        if (response.success && response.data) {
          setCurrentStatus(response.data);
        }
      } catch {
        setError(t("errors.networkError"));
      }
    };

    fetchStatus();
  }, [t]);

  const onSubmit = async (data: ImportFormData) => {
    setIsImporting(true);
    setError(null);
    setSuccess(null);
    setImportProgress(0);

    try {
      // Start the import
      const response = await apiService.importWordbase({
        words: data.words,
        format: data.format,
        language: data.language,
      });

      if (response.success && response.data) {
        setSuccess(response.data);
        setImportProgress(100);
        reset();

        // Refresh status
        const statusResponse = await apiService.getWordbaseStatus();
        if (statusResponse.success && statusResponse.data) {
          setCurrentStatus(statusResponse.data);
        }
      } else {
        setError(response.error?.message || t("wordbase.importForm.failed"));
      }
    } catch {
      setError(t("errors.networkError"));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <VStack gap={8} align="stretch">
      {/* Page Header */}
      <Box textAlign="center">
        <Heading size="2xl" mb={4}>
          {t("wordbase.import.title")}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          {t("wordbase.import.description")}
        </Text>
      </Box>

      {/* Current Status */}
      {currentStatus && (
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
        >
          <VStack gap={4}>
            <Heading size="lg" textAlign="center">
              {t("wordbase.status")}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {(currentStatus.total_words || 0).toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {t("wordbase.statusLabels.total_words")}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {currentStatus.languages_available?.length || 0}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {t("wordbase.statusLabels.languages")}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                  {currentStatus.last_updated
                    ? new Date(currentStatus.last_updated).toLocaleDateString()
                    : "N/A"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {t("wordbase.statusLabels.last_updated")}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      )}

      {/* Import Form */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={6}>
            <Heading size="lg">{t("wordbase.importForm.title")}</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
              <Box>
                <Text mb={2} fontWeight="medium">
                  {t("wordbase.importForm.format")}
                </Text>
                <select
                  {...register("format")}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    fontSize: "16px",
                  }}
                >
                  <option value="text">
                    {t("wordbase.formats.plaintext")} (
                    {t("wordbase.import.instructions.plain_text")})
                  </option>
                  <option value="json">{t("wordbase.formats.json")}</option>
                </select>
              </Box>

              <Box>
                <Text mb={2} fontWeight="medium">
                  {t("wordbase.importForm.language")}
                </Text>
                <select
                  {...register("language")}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    fontSize: "16px",
                  }}
                >
                  <option value="et">{t("wordbase.languages.et")}</option>
                  <option value="en">{t("wordbase.languages.en")}</option>
                  <option value="de">{t("wordbase.languages.de")}</option>
                  <option value="fr">{t("wordbase.languages.fr")}</option>
                </select>
              </Box>
            </SimpleGrid>

            <Box w="full">
              <Text mb={2} fontWeight="medium">
                {t("wordbase.importForm.content")}
              </Text>
              <Textarea
                {...register("words")}
                placeholder={t("wordbase.importForm.placeholder")}
                rows={10}
                resize="vertical"
                borderColor={errors.words ? "red.300" : "gray.300"}
              />
              {errors.words && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.words.message}
                </Text>
              )}
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting || isImporting}
              loadingText="Importing..."
              size="lg"
            >
              <DownloadIcon style={{ marginRight: "8px" }} />
              {t("wordbase.importForm.importButton")}
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Import Progress */}
      {isImporting && (
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
        >
          <VStack gap={4}>
            <Text fontWeight="medium">Import Progress</Text>
            <Box w="full" bg="gray.200" borderRadius="full" h="8px">
              <Box
                bg="blue.500"
                h="8px"
                borderRadius="full"
                width={`${importProgress}%`}
                transition="width 0.3s ease"
              />
            </Box>
            <Text fontSize="sm" color="gray.600">
              Processing words... {importProgress}%
            </Text>
          </VStack>
        </Box>
      )}

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

      {/* Success Alert */}
      {success && (
        <Box
          bg="green.50"
          border="1px"
          borderColor="green.200"
          borderRadius="md"
          p={6}
        >
          <VStack align="start" gap={2}>
            <Text fontWeight="bold" color="green.700">
              Import Successful!
            </Text>
            <HStack gap={4} fontSize="sm">
              <Text>
                <strong>Words Added:</strong> {success.words_added}
              </Text>
              <Text>
                <strong>Duplicates Skipped:</strong>{" "}
                {success.duplicates_skipped}
              </Text>
              <Text>
                <strong>Total Time:</strong> {success.import_time_ms}ms
              </Text>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Instructions */}
      <Box
        bg="blue.50"
        p={6}
        borderRadius="lg"
        border="1px"
        borderColor="blue.200"
      >
        <VStack gap={4} align="start">
          <Heading size="md" color="blue.700">
            {t("wordbase.import.instructions.title")}
          </Heading>
          <VStack align="start" gap={2} fontSize="sm" color="blue.600">
            <Text>
              • <strong>{t("wordbase.import.instructions.plain_text")}</strong>
            </Text>
            <Text>
              • <strong>{t("wordbase.import.instructions.json_format")}</strong>
            </Text>
            <Text>
              •{" "}
              <strong>
                {t("wordbase.import.instructions.language_selection")}
              </strong>
            </Text>
            <Text>
              • <strong>{t("wordbase.import.instructions.duplicates")}</strong>
            </Text>
            <Text>
              •{" "}
              <strong>
                {t("wordbase.import.instructions.processing_time")}
              </strong>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default WordbaseImportPage;
