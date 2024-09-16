import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty";
import SessionReact, {
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import {
  getUserInfo,
  getUserInfoSSR,
} from "../api/routes/onboarding/onboarding.query";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    getRedirectionURL: async (context) => {
      if (context.action === "SUCCESS" && context.newSessionCreated) {
        // called on a successful sign in / up. Where should the user go next?
        let redirectToPath = context.redirectToPath;
        if (redirectToPath !== undefined) {
          // we are navigating back to where the user was before they authenticated
          return redirectToPath;
        }
        const userInfo = await getUserInfoSSR();
        console.log(userInfo);
        if (context.createdNewUser || userInfo?.onboarded === false) {
          context.newSessionCreated.valueOf;
          return "/onboarding";
        } else {
          // user signed in
          return "/";
        }
      }
      // return undefined to let the default behaviour play out
      return undefined;
    },
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [ThirdPartyReact.Google.init()],
        },
      }),
      EmailPasswordReact.init({
        signInAndUpFeature: {},
      }),
      SessionReact.init(),
    ],
    style: `[data-supertokens~=container] {
            --palette-primary: 5, 23, 61;
            --palette-textLink: 0, 162, 175;
            font-family: '__DM_Sans_0dfae3';
            letter-spacing: normal;
        }
            [data-supertokens~=input] {
            font-family: '__DM_Sans_0dfae3';
            letter-spacing: normal;}

        [data-supertokens~=providerGoogle] {
            font-family: '__DM_Sans_0dfae3';
            letter-spacing: normal;}

        [data-supertokens~=headerSubtitle] {
            letter-spacing: normal;}   
        
        [data-supertokens~=headTitle] {
            letter-spacing: normal;
        }
        
        [data-supertokens~=superTokensBranding] {
        display: none;}    
        
        @media (max-width: 440px) {
            [data-supertokens~=container] {
            width: 100%;
            }
        }
        `,
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  };
};
