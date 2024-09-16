"use client";
import { useRouter } from "next/navigation";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";

export default function Page() {
  const session = useSessionContext();
  const router = useRouter();

  if (
    !session.loading &&
    session.doesSessionExist &&
    session.accessTokenPayload.onboarded === false
  ) {
    return router.push("/onboarding");
  }
  return (
    <SessionAuth>
      <p>hello!</p>
    </SessionAuth>
  );
}
