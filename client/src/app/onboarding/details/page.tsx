import { getGpSurgeries } from "../../api/routes/onboarding/onboarding.query";
import OnboardingForm from "./OnBoardingForm";

type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export default async function OnboardFormPage() {
  // Fetch GP surgeries on the server side
  const gpSurgeries: Array<GpSurgery> = await getGpSurgeries();

  return <OnboardingForm gpSurgeries={gpSurgeries} />;
}
