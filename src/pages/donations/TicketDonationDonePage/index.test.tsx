import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import TicketDonationDonePage from ".";

describe("TicketDonationDonePage", () => {
  it("should render without error", () => {
    renderComponent(<TicketDonationDonePage />, {
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
