import { renderComponent, waitForPromises } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import NonProfitsList from ".";

jest.mock("hooks/useImpactConversion", () => ({
  useImpactConversion: () => ({
    variation: "Control",
  }),
}));

describe("Causes", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    status: "active",
    withPoolBalance: true,
  });

  const cause2 = causeFactory({
    id: 2,
    name: "cause2",
    status: "inactive",
    withPoolBalance: false,
  });

  const nonProfits = [
    nonProfitFactory({
      id: 1,
      impactByTicket: 2,
      cause: cause1,
    }),
  ];

  beforeEach(async () => {
    renderComponent(<NonProfitsList nonProfits={nonProfits} />, {
      nonProfitsProviderValue: {
        nonProfits,
        isLoading: false,
      },
      causesProviderValue: {
        causes: [cause1, cause2],
        filteredCauses: [cause1],
        isLoading: false,
      },

      ticketsProviderValue: {
        ticketsCounter: 1,
        isLoading: false,
      },
    });
    await waitForPromises();
  });

  it("renders the non profit card", () => {
    expectTextToBeInTheDocument("Donate ticket");
  });
});
