import { GrowthBook } from "@growthbook/growthbook-react";
import { logEvent } from "services/analytics";
import firebase from "firebase/app";
import { RIBON_GROWTHBOOK_URL } from "utils/constants";

// Create a GrowthBook instance
export const growthbook = new GrowthBook({
  // Callback when a user is put into an A/B experiment
  trackingCallback: (experiment, result) => {
    logEvent("viewed_experiment", {
      experimentId: experiment.key,
      variationId: result.variationId.toString(),
    });
  },
});

export const growthbookSetAttributes = async () => {
  if (process.env.NODE_ENV === "development") return;
  const installationId = await firebase.app().installations().getId();
  localStorage.setItem("installationId", installationId);
  growthbook.setAttributes({
    id: installationId,
    company: "ribon",
  });
};

export const growthbookSetFeatures = () => {
  fetch(RIBON_GROWTHBOOK_URL)
    .then((res) => res.json())
    .then((parsed) => {
      growthbook.setFeatures(parsed.features);
    });
};
