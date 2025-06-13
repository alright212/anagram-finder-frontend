export interface TranslationSet {
  translation: Record<string, unknown>;
}

export interface CommonTranslations {
  search: string;
  import: string;
  about: string;
  home: string;
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  close: string;
  [key: string]: string | Record<string, string>;
}

export interface NavigationTranslations {
  title: string;
  subtitle: string;
  [key: string]: string | Record<string, string>;
}

export interface SearchTranslations {
  title: string;
  description: string;
  placeholder: string;
  searchButton: string;
  noResults: string;
  recentSearches: string;
  results: {
    title: string;
    count: string;
    executionTime: string;
    algorithm: string;
    [key: string]: string;
  };
  tips: {
    title: string;
    items: {
      estonianWords: string;
      minimumLength: string;
      clickResults: string;
      useHistory: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };
  [key: string]: string | Record<string, string | Record<string, string>>;
}

export interface WordbaseTranslations {
  title: string;
  status: string;
  totalWords: string;
  lastImport: string;
  statusLabels: {
    total_words: string;
    languages: string;
    last_updated: string;
    [key: string]: string;
  };
  import: {
    title: string;
    description: string;
    instructions: {
      title: string;
      plain_text: string;
      json_format: string;
      language_selection: string;
      duplicates: string;
      processing_time: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };
  importForm: {
    title: string;
    content: string;
    format: string;
    language: string;
    importButton: string;
    placeholder: string;
    [key: string]: string;
  };
  formats: {
    plaintext: string;
    json: string;
    [key: string]: string;
  };
  languages: {
    et: string;
    en: string;
    de: string;
    fr: string;
    [key: string]: string;
  };
  [key: string]: string | Record<string, string | Record<string, string>>;
}

export interface AboutTranslations {
  title: string;
  description: string;
  features: {
    title: string;
    items: string[];
    [key: string]: string | string[];
  };
  algorithm: {
    title: string;
    description: string;
    [key: string]: string;
  };
  [key: string]: string | Record<string, string | string[]>;
}

export interface ErrorTranslations {
  networkError: string;
  serverError: string;
  invalidInput: string;
  wordNotFound: string;
  importFailed: string;
  [key: string]: string;
}

export interface HomeTranslations {
  statistics: {
    totalWords: string;
    inDatabase: string;
    uniqueAnagrams: string;
    combinations: string;
    mostAnagrams: string;
    for: string;
    avgSearchTime: string;
    perSearch: string;
    [key: string]: string;
  };
  features: {
    fastSearch: string;
    importDatabase: string;
    modernInterface: string;
    [key: string]: string;
  };
  readyToSearch: string;
  databaseLoaded: string;
  startSearching: string;
  [key: string]: string | Record<string, string>;
}

export interface FooterTranslations {
  copyright: string;
  [key: string]: string;
}

export interface ApiTranslations {
  common?: Record<string, string>;
  navigation?: Record<string, string>;
  search?: Record<string, Record<string, string | Record<string, string>>>;
  wordbase?: Record<string, string | Record<string, string>>;
  about?: Record<string, string | Record<string, string | string[]>>;
  errors?: Record<string, string>;
  [key: string]: Record<string, unknown> | undefined;
}
