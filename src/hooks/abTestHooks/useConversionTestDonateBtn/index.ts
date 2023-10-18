import { useExperiment } from "@growthbook/growthbook-react";

function useConversionTestDonateBtn() {
  const { value } = useExperiment({
    key: "conversion-test-donate-btn",
    variations: ["control", "button", "button_and_info"],
  });

  function isInControlVariation() {
    return value === "control";
  }

  function isInButtonVariation() {
    return value === "button";
  }

  function isInButtonAndInfoVariation() {
    return value === "button_and_info";
  }

  return {
    value,
    isInControlVariation,
    isInButtonAndInfoVariation,
    isInButtonVariation,
  };
}

export default useConversionTestDonateBtn;
