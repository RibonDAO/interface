import { GrowthBook } from "@growthbook/growthbook-react";
import firebase from "firebase/app";
import { logEvent } from "services/analytics";

// Create a GrowthBook instance
export const growthbook = new GrowthBook({
  // Callback when a user is put into an A/B experiment
  trackingCallback: (experiment, result) => {
    logEvent("viewed_experiment", {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

export const growthbookSetAttributes = async () => {
  const installationId = await firebase.app().installations().getId();
  localStorage.setItem("installationId", installationId);
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
