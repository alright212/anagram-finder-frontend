import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Estonian translations
const et = {
  translation: {
    common: {
      search: 'Otsing',
      import: 'Import',
      about: 'Teave',
      home: 'Avaleht',
      loading: 'Laadimine...',
      error: 'Viga',
      success: 'Õnnestus',
      cancel: 'Loobu',
      save: 'Salvesta',
      delete: 'Kustuta',
      edit: 'Muuda',
      close: 'Sulge',
    },
    navigation: {
      title: 'Eesti Anagrammide Otsija',
      subtitle: 'Leia sõnade anagramme kiirelt ja lihtsalt',
    },
    search: {
      title: 'Anagrammide Otsing',
      placeholder: 'Sisesta sõna anagrammide leidmiseks...',
      searchButton: 'Otsi Anagramme',
      noResults: 'Anagramme ei leitud',
      results: {
        title: 'Leitud anagrammid:',
        count: 'Kokku: {{count}} anagrammi',
        executionTime: 'Otsinguaeg: {{time}}ms',
        algorithm: 'Algoritm: {{algorithm}}',
      },
    },
    wordbase: {
      title: 'Sõnabaasi Import',
      status: 'Sõnabaasi Olek',
      totalWords: 'Kokku sõnu: {{count}}',
      lastImport: 'Viimane import: {{date}}',
      importForm: {
        title: 'Impordi Sõnad',
        content: 'Sõnad (iga sõna uuel real)',
        format: 'Formaat',
        language: 'Keel',
        importButton: 'Impordi Sõnad',
      },
      formats: {
        plaintext: 'Tavaline tekst',
        json: 'JSON',
      },
      languages: {
        et: 'Eesti keel',
        en: 'Inglise keel',
        de: 'Saksa keel',
        fr: 'Prantsuse keel',
      },
    },
    about: {
      title: 'Anagrammide Otsija Kohta',
      description: 'See rakendus võimaldab teil leida eesti sõnade anagramme kasutades täiustatud algoritme.',
      features: {
        title: 'Omadused:',
        items: [
          'Kiire anagrammide otsing',
          'Mitmekeelne tugi',
          'Kohandatav sõnabaas',
          'Moodne kasutajaliides',
          'Reaalajas statistika',
        ],
      },
      algorithm: {
        title: 'Algoritm',
        description: 'Kasutame optimeeritud algoritme, mis tagavad kiire ja täpse anagrammide leidmise.',
      },
    },
    errors: {
      networkError: 'Võrguühenduse viga',
      serverError: 'Serveri viga',
      invalidInput: 'Vigane sisend',
      wordNotFound: 'Sõna ei leitud',
      importFailed: 'Import ebaõnnestus',
    },
  },
};

// English translations
const en = {
  translation: {
    common: {
      search: 'Search',
      import: 'Import',
      about: 'About',
      home: 'Home',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
    },
    navigation: {
      title: 'Estonian Anagram Finder',
      subtitle: 'Find word anagrams quickly and easily',
    },
    search: {
      title: 'Anagram Search',
      placeholder: 'Enter a word to find anagrams...',
      searchButton: 'Search Anagrams',
      noResults: 'No anagrams found',
      results: {
        title: 'Found anagrams:',
        count: 'Total: {{count}} anagrams',
        executionTime: 'Search time: {{time}}ms',
        algorithm: 'Algorithm: {{algorithm}}',
      },
    },
    wordbase: {
      title: 'Wordbase Import',
      status: 'Wordbase Status',
      totalWords: 'Total words: {{count}}',
      lastImport: 'Last import: {{date}}',
      importForm: {
        title: 'Import Words',
        content: 'Words (one per line)',
        format: 'Format',
        language: 'Language',
        importButton: 'Import Words',
      },
      formats: {
        plaintext: 'Plain text',
        json: 'JSON',
      },
      languages: {
        et: 'Estonian',
        en: 'English',
        de: 'German',
        fr: 'French',
      },
    },
    about: {
      title: 'About Anagram Finder',
      description: 'This application allows you to find anagrams of Estonian words using advanced algorithms.',
      features: {
        title: 'Features:',
        items: [
          'Fast anagram search',
          'Multilingual support',
          'Customizable word database',
          'Modern user interface',
          'Real-time statistics',
        ],
      },
      algorithm: {
        title: 'Algorithm',
        description: 'We use optimized algorithms that ensure fast and accurate anagram detection.',
      },
    },
    errors: {
      networkError: 'Network connection error',
      serverError: 'Server error',
      invalidInput: 'Invalid input',
      wordNotFound: 'Word not found',
      importFailed: 'Import failed',
    },
  },
};

i18n.use(initReactI18next).init({
  resources: {
    et,
    en,
  },
  lng: 'et', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
