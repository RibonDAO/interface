import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import TicketDonationDonePage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useStatistics: () => ({
    userStatistics: {
      totalTickets: 3,
      totalDonated: {
        usd: 10,
        brl: 50,
      },
    },
    refetch: jest.fn(),
  }),
  useUserConfig: () => ({
    userConfig: () => ({
      config: {
        allowedEmailMarketing: false,
      },
      refetch: jest.fn(),
      updateUserConfig: jest.fn(),
    }),
  }),
}));

describe("TicketDonationDonePage", () => {
  beforeAll(async () => {
    await renderComponent(<TicketDonationDonePage />, {
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
      currentUserProviderValue: {
        currentUser: {
          id: 1,
          email: "test@ribon.io",
        },
      },
    });
  });

  it("renders the correct text", () => {
    expectTextToBeInTheDocument("You donated the equivalent of");
    expectTextToBeInTheDocument("2 days of impact for 1 donor");
    expectTextToBeInTheDocument(
      "I want to receive information about my donations by e-mail",
    );
  });
});
