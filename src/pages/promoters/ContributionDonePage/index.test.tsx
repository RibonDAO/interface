import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import causeFactory from "config/testUtils/factories/causeFactory";
import DonationDoneCausePage from ".";

describe("DonationDoneCausePage", () => {
  it("should render without error", () => {
    renderComponent(<DonationDoneCausePage />);

    expectTextToBeInTheDocument("You have donated to");
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

    expectTextToBeInTheDocument("You have donated to");
    expectTextToBeInTheDocument("2 days of impact for 1 donor");
  });

  it("shows the contribution flow for causes", () => {
    renderComponent(<DonationDoneCausePage />, {
      locationState: {
        nonProfit: nonProfitFactory({
          impactByTicket: 2,
          impactDescription: "days of impact",
          cause: causeFactory(),
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
        hasButton: true,
        offerId: 1,
        flow: "cause",
      },
    });
    expectTextToBeInTheDocument("Finish");
    expectTextToBeInTheDocument("You have donated to");
  });

  it("shows the contribution flow for NonProfits", () => {
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
        hasButton: true,
        offerId: 1,
        flow: "nonProfit",
      },
    });
    expectTextToBeInTheDocument("Finish");
    expectTextToBeInTheDocument("You have donated to");
  });
});
