import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import SupportNonProfit from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ name: "💊 Health", id: 2, active: true });
const mockNonProfit = nonProfitFactory({ cause: mockCause });
const mockNonProfit2 = nonProfitFactory({
  cause: mockCause2,
  name: "Other non Profit",
});

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useNonProfits: () => ({
    nonProfits: [mockNonProfit, mockNonProfit2],
    refetch: jest.fn(),
  }),
}));

describe("SupportNonProfit", () => {
  beforeEach(async () => {
    renderComponent(<SupportNonProfit />, {
      causesProviderValue: {
        causes: [mockCause, mockCause2],
      },
    });
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Make a direct donation");
  });

  it("shows only the non profits for that cause", () => {
    expectTextToBeInTheDocument(mockNonProfit.name);
    expectTextNotToBeInTheDocument(mockNonProfit2.name);
  });

  describe("when the button option is clicked", () => {
    it("shows the non profits for that cause", () => {
      clickOn(mockCause.name);

      expectTextToBeInTheDocument(mockNonProfit.name);
    });
  });
});
