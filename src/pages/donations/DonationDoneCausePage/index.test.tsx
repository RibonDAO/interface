import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import DonationDoneCausePage from ".";

describe("DonationDoneCausePage", () => {
  it("should render without error", () => {
    renderComponent(<DonationDoneCausePage />);

    expectTextToBeInTheDocument("You donated");
  });

  it("shows the impact of the donation", () => {
    renderComponent(<DonationDoneCausePage />, {
      locationState: {
        nonProfit: nonProfitFactory({
          impactByTicket: 2,
          impactDescription: "days of impact",
          nonProfitImpacts: [
            {
              id: 1,
              startDate: "2021-01-01",
              endDate: "2021-01-02",
              usdCentsToOneImpactUnit: "100",
              measurementUnit: "day",
              donorRecipient: "donor",
              impactDescription: "days of impact",
            },
          ],
        }),
      },
    });

    expectTextToBeInTheDocument("You donated");
    expectTextToBeInTheDocument("2 days of impact for 1 donor");
  });
});
