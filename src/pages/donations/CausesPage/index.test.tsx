import { renderComponent, waitForPromises } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import nonProfitImpactFactory from "config/testUtils/factories/nonProfitImpactFactory";
import Causes from ".";

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

  const filteredNonProfits = [
    nonProfitFactory({
      id: 1,
      impactByTicket: 2,
      cause: cause1,
      nonProfitImpacts: [nonProfitImpactFactory()],
    }),
    nonProfitFactory({
      id: 3,
      impactByTicket: 4,
      cause: cause1,
      nonProfitImpacts: [nonProfitImpactFactory()],
    }),
  ];
  const nonProfits = [
    nonProfitFactory({
      id: 1,
      impactByTicket: 2,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 2,
      impactByTicket: 3,
      cause: cause2,
    }),
    nonProfitFactory({
      id: 3,
      impactByTicket: 4,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 4,
      impactByTicket: 5,
      cause: cause2,
    }),
    nonProfitFactory({
      id: 5,
      impactByTicket: 6,
      cause: cause2,
    }),
  ];

  beforeEach(async () => {
    renderComponent(<Causes />, {
      nonProfitsProviderValue: {
        filteredNonProfits,
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

  it("renders the title", () => {
    expectTextToBeInTheDocument("Donate to a project");
  });
});
