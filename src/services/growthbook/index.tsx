import { GrowthBook } from "@growthbook/growthbook-react";
import firebase from "firebase/app";
import { setUserProperties } from "services/analytics";

// Create a GrowthBook instance
export const growthbook = new GrowthBook({
  // Callback when a user is put into an A/B experiment
  trackingCallback: (experiment, result) => {
    // eslint-disable-next-line no-console
    console.log("Experiment Viewed", {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

export const growthbookSetAttributes = async () => {
  const installationId = await firebase.app().installations().getId();
  // eslint-disable-next-line no-console
  console.log(installationId);
  setUserProperties({ anonymous_id: installationId });
  growthbook.setAttributes({
    id: installationId,
    company: "ribon",
  });
};

export const growthbookSetFeatures = () => {
  fetch("https://cdn.growthbook.io/api/features/key_prod_a04c5731fa615e46")
    .then((res) => res.json())
    .then((parsed) => {
      growthbook.setFeatures(parsed.features);
    });
};
