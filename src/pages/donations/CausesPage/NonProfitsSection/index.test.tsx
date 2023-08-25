import { renderComponent, waitForPromises } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";

import NonProfitsSection from ".";

jest.mock("hooks/useImpactConversion", () => ({
  useImpactConversion: () => ({
    variation: "Control",
  }),
}));

describe("NonProfitsSection", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    active: true,
    withPoolBalance: true,
  });

  const cause2 = causeFactory({
    id: 2,
    name: "cause2",
    active: false,
    withPoolBalance: false,
  });

  const nonProfitsWithPoolBalance = [
    nonProfitFactory({
      id: 1,
      impactDescription: "days of impact",
      impactByTicket: 2,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 3,
      impactDescription: "days of impact",
      impactByTicket: 4,
      cause: cause1,
    }),
  ];
  const nonProfits = [
    nonProfitFactory({
      id: 1,
      impactDescription: "days of impact",
      impactByTicket: 2,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 2,
      impactDescription: "days of impact",
      impactByTicket: 3,
      cause: cause2,
    }),
    nonProfitFactory({
      id: 3,
      impactDescription: "days of impact",
      impactByTicket: 4,
      cause: cause1,
    }),
  ];

  beforeEach(async () => {
    renderComponent(<NonProfitsSection canDonate />, {
      nonProfitsProviderValue: {
        nonProfitsWithPoolBalance,
        nonProfits,
        isLoading: false,
      },
      causesProviderValue: {
        causes: [cause1, cause2],
        causesWithPoolBalance: [cause1],
        isLoading: false,
      },
    });
    await waitForPromises();
  });

  it("shows the non profit if the cause is active and has pool balance", () => {
    nonProfitsWithPoolBalance.forEach((nonProfit) => {
      if (nonProfit.cause?.active && nonProfit.cause?.withPoolBalance) {
        expectTextToBeInTheDocument(
          `Donate ${nonProfit.impactByTicket} ${nonProfit.impactDescription}`,
        );
      }
    });
  });
});
