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
        primary: "#00A3FF",
        secondary: "#00A3FF",
        accent: "#00A3FF",
        muted: "#00A3FF",
        background: "#00A3FF",
        text: "#00A3FF",
      },
      ...baseTheme.colors,
    },
    styles: {
      global: {
        "html, body": {
          bg: "brand.background",
        },
      },
    },
  },
  proTheme
);
