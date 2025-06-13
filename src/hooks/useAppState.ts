import { useContext } from "react";
import { AppStateContext } from "../context/AppStateContext.tsx";

// Custom hook to use the context
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
