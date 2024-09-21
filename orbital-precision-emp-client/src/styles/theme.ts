import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, baseTheme, background } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    colors: {
      brand: {
        primary: "#00A3FF", // Light blue glow accent
        secondary: "#F2F2F2", // Light gray for secondary text
        accent: "#FFD700", // Golden accent color for highlights
        muted: "#B3B3B3", // Muted light gray for less prominent text
        background: "#0A0A0A", // Dark background
        text: "#FFFFFF", // Main text color - white for readability
      },
      ...baseTheme.colors,
    },
    styles: {
      global: {
        "html, body": {
          bg: "brand.background",
        },
        a: {
          color: "brand.primary",
          _hover: {
            color: "brand.accent",
          },
        },
      },
    },
  },
  proTheme
);
