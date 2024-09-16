export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "KinWell Pharmacy",
  apiDomain:
    process.env.NEXT_PUBLIC_PHARMA_PAL_API_URL ?? "http://localhost:4444",
  websiteDomain: process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:4445",
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};
