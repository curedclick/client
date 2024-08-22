"use client"; // This directive is necessary to use client-side functionality

import { Montserrat, Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme"; // Adjust the import to your theme file

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${roboto.className}`}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
