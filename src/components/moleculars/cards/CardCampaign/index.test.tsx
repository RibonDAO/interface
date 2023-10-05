import React from "react";
import { renderComponent } from "config/testUtils";
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
});
