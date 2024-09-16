"use client"; // This directive is necessary to use client-side functionality

import { Montserrat, Roboto, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme"; // Adjust the import to your theme file
import ButtonAppBar from "./components/navbar";
import "./globals.css";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SuperTokensProvider } from "./components/supertokensProvider";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const dmSans = DM_Sans({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeProvider theme={theme}>
          <SuperTokensProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ButtonAppBar />
              <Container>{children}</Container>
            </LocalizationProvider>
          </SuperTokensProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
