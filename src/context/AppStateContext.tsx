import React, { createContext, useReducer, useEffect, type ReactNode } from "react";
import type { WordbaseStatus, AnagramStats } from "../types/api";

// State interface
export interface AppState {
  wordbaseStatus: WordbaseStatus | null;
  anagramStats: AnagramStats | null;
  isLoading: boolean;
  error: string | null;
  currentLanguage: string;
  searchHistory: string[];
}

// Action types
export type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_WORDBASE_STATUS"; payload: WordbaseStatus }
  | { type: "SET_ANAGRAM_STATS"; payload: AnagramStats }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "ADD_TO_SEARCH_HISTORY"; payload: string }
  | { type: "CLEAR_SEARCH_HISTORY" }
  | { type: "LOAD_FROM_STORAGE"; payload: Partial<AppState> };

// localStorage keys
const STORAGE_KEYS = {
  SEARCH_HISTORY: 'anagram-search-history',
  CURRENT_LANGUAGE: 'i18nextLng', // Match i18next's key
} as const;

// Helper functions for localStorage
const saveToStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

const loadFromStorage = (key: string, defaultValue: unknown): unknown => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Initial state with localStorage data
const getInitialState = (): AppState => ({
  wordbaseStatus: null,
  anagramStats: null,
  isLoading: false,
  error: null,
  currentLanguage: loadFromStorage(STORAGE_KEYS.CURRENT_LANGUAGE, "et") as string,
  searchHistory: loadFromStorage(STORAGE_KEYS.SEARCH_HISTORY, []) as string[],
});

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  let newState: AppState;

  switch (action.type) {
    case "SET_LOADING":
      newState = { ...state, isLoading: action.payload };
      break;
    case "SET_ERROR":
      newState = { ...state, error: action.payload, isLoading: false };
      break;
    case "SET_WORDBASE_STATUS":
      newState = { ...state, wordbaseStatus: action.payload, error: null };
      break;
    case "SET_ANAGRAM_STATS":
      newState = { ...state, anagramStats: action.payload, error: null };
      break;
    case "SET_LANGUAGE":
      newState = { ...state, currentLanguage: action.payload };
      // Save language to localStorage
      saveToStorage(STORAGE_KEYS.CURRENT_LANGUAGE, action.payload);
      break;
    case "ADD_TO_SEARCH_HISTORY": {
      const newHistory = [
        action.payload,
        ...state.searchHistory.filter((word) => word !== action.payload),
      ].slice(0, 10);
      newState = { ...state, searchHistory: newHistory };
      // Save search history to localStorage
      saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, newHistory);
      break;
    }
    case "CLEAR_SEARCH_HISTORY":
      newState = { ...state, searchHistory: [] };
      // Clear search history from localStorage
      saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, []);
      break;
    case "LOAD_FROM_STORAGE":
      newState = { ...state, ...action.payload };
      break;
    default:
      newState = state;
  }

  return newState;
}

// Context
export const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  // Load data from localStorage on mount
  useEffect(() => {
    const searchHistory = loadFromStorage(STORAGE_KEYS.SEARCH_HISTORY, []) as string[];
    const currentLanguage = loadFromStorage(STORAGE_KEYS.CURRENT_LANGUAGE, "et") as string;
    
    dispatch({
      type: "LOAD_FROM_STORAGE",
      payload: {
        searchHistory,
        currentLanguage,
      },
    });
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}
