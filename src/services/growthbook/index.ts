import { GrowthBook } from "@growthbook/growthbook-react";
import { RIBON_GROWTHBOOK_FEATURES } from "utils/constants";

export function growthBookInit() {
  const growthBook = new GrowthBook({
    trackingCallback: (experiment, result) => {
      console.log({
        experimentId: experiment.key,
        variationId: result.variationId,
      });
    },
  });
  return { growthBook };
}

export function setGrowthBookFeatures() {
  const { growthBook } = growthBookInit();
  fetch(RIBON_GROWTHBOOK_FEATURES || "localhost:3000/api/features")
    .then((res) => res.json())
    .then((json) => {
      growthBook.setFeatures(json.features);
    });
}
