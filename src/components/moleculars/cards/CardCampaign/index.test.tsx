import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardCampaign from ".";

describe("CardCampaign", () => {
  it("renders without error", () => {
    const value = 10;

    renderComponent(
      <CardCampaign
        value={value}
        from="kidsCampaignCTA"
        flow="nonProfit"
        campaignLink="link"
      />,
    );

    expectTextToBeInTheDocument("Participate in the campaign");
  });

  it("navigates to campaign link when clicked", () => {
    const value = 10;
    window.location.replace = jest.fn();
    renderComponent(
      <CardCampaign
        value={value}
        from="kidsCampaignCTA"
        flow="nonProfit"
        campaignLink="link"
      />,
    );

    clickOn("Participate in the campaign");
    expect(window.location.replace).toHaveBeenCalledWith("link");
  });
});
