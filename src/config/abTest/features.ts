import { useExperiment } from "@growthbook/growthbook-react";

export function ImpactVariation() {
  const { value } = useExperiment({
    key: "impact-conversion-staging",
    variations: ["Control", "NewImpact", "OldImpact"],
  });
  return value;
}
