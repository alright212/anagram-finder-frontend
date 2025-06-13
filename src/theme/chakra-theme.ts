import { extendTheme } from "@chakra-ui/react";

// Estonian flag colors with modern variations
const theme = extendTheme({
  colors: {
    estonian: {
      blue: {
        50: "#E8F4FD",
        100: "#C1E0FB",
        200: "#9BCBF8",
        300: "#74B6F6",
        400: "#4DA1F3",
        500: "#0072CE", // Main Estonian blue
        600: "#005BA5",
        700: "#00447C",
        800: "#002D53",
        900: "#001629",
      },
      black: {
        50: "#F7F7F7",
        100: "#E1E1E1",
        200: "#CFCFCF",
        300: "#B1B1B1",
        400: "#9E9E9E",
        500: "#000000", // Pure black
        600: "#2D2D2D",
        700: "#1A1A1A",
        800: "#0D0D0D",
        900: "#000000",
      },
      white: {
        50: "#FFFFFF",
        100: "#FAFAFA",
        200: "#F5F5F5",
        300: "#F0F0F0",
        400: "#EBEBEB",
        500: "#FFFFFF", // Pure white
        600: "#E6E6E6",
        700: "#CCCCCC",
        800: "#B3B3B3",
        900: "#999999",
      },
    },
    // Modern accent colors
    accent: {
      teal: "#20B2AA",
      orange: "#FF8C00",
      green: "#32CD32",
      purple: "#8A2BE2",
    },
  },
  fonts: {
    heading:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  semanticTokens: {
    colors: {
      primary: {
        default: "estonian.blue.500",
        _dark: "estonian.blue.400",
      },
      accent: {
        default: "accent.teal",
      },
    },
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export default theme;
