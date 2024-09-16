import { createTheme } from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";

declare module "@mui/material/styles" {
  interface Palette {
    appBar: Palette["primary"];
  }

  interface PaletteOptions {
    appBar?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  spacing: 8,
  palette: {
    appBar: {
      main: "#FFFFFF",
    },
    primary: {
      main: "#05173d",
    },
    secondary: {
      main: "#00a2af",
    },
    text: {
      primary: "#303133",
    },
  },
  typography: {
    fontFamily: "__DM_Sans_0dfae3, Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "100px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          alignItems: "flex-start",
        },
        listbox: {
          alignItems: "flex-start",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});
