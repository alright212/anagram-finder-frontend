import { createSystem, defineConfig } from "@chakra-ui/react";

// Estonian flag colors with modern variations
const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        estonian: {
          blue: {
            50: { value: "#E8F4FD" },
            100: { value: "#C1E0FB" },
            200: { value: "#9BCBF8" },
            300: { value: "#74B6F6" },
            400: { value: "#4DA1F3" },
            500: { value: "#0072CE" }, // Main Estonian blue
            600: { value: "#005BA5" },
            700: { value: "#00447C" },
            800: { value: "#002D53" },
            900: { value: "#001629" },
          },
          black: {
            50: { value: "#F7F7F7" },
            100: { value: "#E1E1E1" },
            200: { value: "#CFCFCF" },
            300: { value: "#B1B1B1" },
            400: { value: "#9E9E9E" },
            500: { value: "#000000" }, // Pure black
            600: { value: "#2D2D2D" },
            700: { value: "#1A1A1A" },
            800: { value: "#0D0D0D" },
            900: { value: "#000000" },
          },
          white: {
            50: { value: "#FFFFFF" },
            100: { value: "#FAFAFA" },
            200: { value: "#F5F5F5" },
            300: { value: "#F0F0F0" },
            400: { value: "#EBEBEB" },
            500: { value: "#FFFFFF" }, // Pure white
            600: { value: "#E6E6E6" },
            700: { value: "#CCCCCC" },
            800: { value: "#B3B3B3" },
            900: { value: "#999999" },
          },
        },
        // Modern accent colors
        accent: {
          teal: { value: "#20B2AA" },
          orange: { value: "#FF8C00" },
          green: { value: "#32CD32" },
          purple: { value: "#8A2BE2" },
        },
      },
      fonts: {
        heading: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        },
        body: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          DEFAULT: { value: "{colors.estonian.blue.500}" },
          _dark: { value: "{colors.estonian.blue.400}" },
        },
        accent: {
          DEFAULT: { value: "{colors.accent.teal}" },
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
  },
});

export const system = createSystem(theme);
export default system;
