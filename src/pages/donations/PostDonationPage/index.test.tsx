import React from "react";
import { renderComponent } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockLogEventFunction } from "setupTests";
import causeFactory from "config/testUtils/factories/causeFactory";
import { useImpactConversion } from "hooks/useImpactConversion";
import PostDonationPage from ".";

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

describe("Causes", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    active: true,
  });

  const nonProfit1 = nonProfitFactory({
    id: 1,
    impactDescription: "days of impact",
    impactByTicket: 2,
    cause: cause1,
  });

  describe("postDonationPage", () => {
    beforeEach(() => {
      const mockUseImpactConversion = useImpactConversion as jest.Mock;
      mockUseImpactConversion.mockReturnValue({
        contribution: {
          image: "test-image-url",
          impact: "This is a test impact",
          value: 100,
        },
        nonProfit: { name: "Test Non-Profit" },
        offer: { id: 1 },
        description: "This is a test description",
      });
      renderComponent(<PostDonationPage />, {
        locationState: {
          nonProfit: nonProfit1,
          cause: cause1,
        },
      });
    });

    it("renders the title", () => {
      expectTextToBeInTheDocument("If you wish, you can do more");
    });

    it("shows the non profit", () => {
      expectTextToBeInTheDocument(nonProfit1.name);
    });

    it("shows the cause", () => {
      expectTextToBeInTheDocument(cause1.name);
    });

    it("logs view events", () => {
      expect(mockLogEventFunction).toHaveBeenCalledWith(
        "contributeCauseBtn_view",
        {
          from: "givePostDonation_page",
          platform: "web",
        },
      );
      expect(mockLogEventFunction).toHaveBeenCalledWith(
        "contributeNgoBtn_view",
        {
          from: "givePostDonation_page",
          platform: "web",
        },
      );
    });
  });
});
