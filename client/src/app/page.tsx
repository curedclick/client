"use client";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function Page() {
  return (
    <SessionAuth>
      <p>hello!</p>
    </SessionAuth>
  );
}
