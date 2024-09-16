"use client";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionAuth>{children}</SessionAuth>;
}
