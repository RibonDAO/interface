import { useExperiment } from "@growthbook/growthbook-react";

export const progressionTest = useExperiment({
  key: "progression-test-first-stage",
  variations: [false, true],
});
