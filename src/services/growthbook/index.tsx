import { GrowthBook } from "@growthbook/growthbook-react";
import { logEvent } from "lib/events";
import firebase from "firebase/app";
import { RIBON_GROWTHBOOK_URL } from "utils/constants";
import { logError } from "services/crashReport";

// Create a GrowthBook instance
export const growthbook = new GrowthBook({
  apiHost: "https://growthbook.ribon.io:444",
  clientKey: process.env.REACT_APP_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.REACT_APP_GROWTHBOOK_DEV_MODE === "true",
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
  const hasDonated = localStorage.getItem("HAS_DONATED");
  growthbook.setAttributes({
    id: installationId,
    hasDonated,
    company: "ribon",
  });
};

export const growthbookSetFeatures = () => {
  try {
    fetch(RIBON_GROWTHBOOK_URL)
      .then((res) => res.json())
      .then((parsed) => {
        growthbook.setFeatures(parsed.features);
      });
  } catch (e) {
    logError(e);
  }
};
