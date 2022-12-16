import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import SupportCausePage from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ name: "💊 Health", id: 2, active: true });
const mockNonProfit = nonProfitFactory({ cause: mockCause });
const mockNonProfit2 = nonProfitFactory({
  cause: mockCause2,
  name: "Other non Profit",
});

jest.mock("hooks/apiHooks/useCauses", () => ({
  __esModule: true,
  default: () => ({
    causes: [mockCause, mockCause2],
    refetch: () => {},
  }),
}));

jest.mock("hooks/apiHooks/useNonProfits", () => ({
  __esModule: true,
  default: () => ({
    nonProfits: [mockNonProfit, mockNonProfit2],
    refetch: () => {},
  }),
}));

describe("SupportCausePage", () => {
  beforeEach(async () => {
    renderComponent(<SupportCausePage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Make a direct donation");
  });

  it("logs the nonProfitSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("nonProfitSupportScreen_view");
  });

  it("shows only the non profits for that cause", () => {
    expectTextToBeInTheDocument(mockNonProfit.name);
    expectTextNotToBeInTheDocument(mockNonProfit2.name);
  });

  describe("when the button option is clicked", () => {
    it("logs the nonProfitCauseSelection_click event", () => {
      clickOn(mockCause2.name);

      expectLogEventToHaveBeenCalledWith("nonProfitCauseSelection_click", {
        id: 2,
      });
    });

    it("shows the non profits for that cause", () => {
      clickOn(mockCause.name);

      expectTextToBeInTheDocument(mockNonProfit.name);
    });
  });
});
