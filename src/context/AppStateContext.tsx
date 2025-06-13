import React, { createContext, useReducer, type ReactNode } from "react";
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
  | { type: "CLEAR_SEARCH_HISTORY" };

// Initial state
const initialState: AppState = {
  wordbaseStatus: null,
  anagramStats: null,
  isLoading: false,
  error: null,
  currentLanguage: "et",
  searchHistory: [],
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_WORDBASE_STATUS":
      return { ...state, wordbaseStatus: action.payload, error: null };
    case "SET_ANAGRAM_STATS":
      return { ...state, anagramStats: action.payload, error: null };
    case "SET_LANGUAGE":
      return { ...state, currentLanguage: action.payload };
    case "ADD_TO_SEARCH_HISTORY": {
      const newHistory = [
        action.payload,
        ...state.searchHistory.filter((word) => word !== action.payload),
      ].slice(0, 10);
      return { ...state, searchHistory: newHistory };
    }
    case "CLEAR_SEARCH_HISTORY":
      return { ...state, searchHistory: [] };
    default:
      return state;
  }
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
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}
