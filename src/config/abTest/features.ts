import { useFeature } from "@growthbook/growthbook-react";

export const menuOnFirstDonationFeature = () =>
  useFeature("menu-on-first-donation").on;
