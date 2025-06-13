// API Types based on your Laravel backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  success: boolean;
}

// Wordbase types
export interface WordbaseStatus {
  total_words: number;
  status: "empty" | "imported" | "importing";
  last_import?: string;
  last_updated: string;
  languages_available: string[];
  languages?: string[];
}

export interface WordbaseImportRequest {
  words: string;
  format: "text" | "json";
  language?: string;
}

export interface WordbaseImportResponse {
  message: string;
  words_added: number;
  duplicates_skipped: number;
  import_time_ms: number;
  imported_count: number;
  skipped_count: number;
  total_processed: number;
}

// Anagram types
export interface AnagramResponse {
  word: string;
  anagrams: string[];
  count: number;
  algorithm_used: string;
  execution_time: number;
  search_depth?: number;
}

export interface AnagramStats {
  total_words: number;
  total_unique_anagrams: number;
  most_anagrams: {
    word: string;
    count: number;
    anagrams: string[];
  };
  algorithm_performance: {
    name: string;
    average_time: number;
    total_searches: number;
  };
}

// Locale types
export interface LocaleInfo {
  current_locale: string;
  available_locales: string[];
  fallback_locale: string;
  user_preference?: string;
}

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface LocalePreference {
  locale: string;
  remember?: boolean;
}
