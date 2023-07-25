import { useExperiment } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import useNavigation from "hooks/useNavigation";

function SupportCauseFlowControlPage() {
  const { navigateTo } = useNavigation();
  const { value: variation } = useExperiment({
    key: "support-cause-page-links",
    variations: ["Control", "SupportDash", "SupportCause"],
  });

  const navigateToSelectedFlow = () => {
    if (variation === "SupportCause") {
      window.location.replace("https://projetos.ribon.io/promotor-causa");
      return;
    }
    if (variation === "SupportDash") {
      window.location.replace("https://projetos.ribon.io/promotor-dash");
      return;
    }

    navigateTo("/promoters/support-cause");
  };

  useEffect(() => {
    navigateToSelectedFlow();
  }, []);

  return <div />;
}

export default SupportCauseFlowControlPage;
