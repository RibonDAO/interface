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
        cardData={{
          headline: "headline",
          description: "description",
          title: "title",
          ctaText: "Participate in the campaign",
          ctaUrl: "link",
          active: true,
        }}
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
        cardData={{
          headline: "headline",
          description: "description",
          title: "title",
          ctaText: "Participate in the campaign",
          ctaUrl: "link",
          active: true,
        }}
      />,
    );

    clickOn("Participate in the campaign");
    expect(window.location.replace).toHaveBeenCalledWith("link");
  });
});
