import { useFeature } from "@growthbook/growthbook-react";

export const menuInFirstDonationFeature = () =>
  useFeature("menu-in-first-donation").on;
