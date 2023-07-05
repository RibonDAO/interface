import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import ConfirmDonationPage from ".";

describe("ConfirmDonationPage", () => {
  const nonProfit = nonProfitFactory();
  it("should render without error", () => {
    renderComponent(<ConfirmDonationPage />, {
      currentUserProviderValue: {
        signedIn: true,
      },
      locationState: {
        nonProfit,
      },
    });

    expectTextToBeInTheDocument("Confirm donation");
  });
});
