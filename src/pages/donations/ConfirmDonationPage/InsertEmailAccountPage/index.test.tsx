import { nonProfitFactory } from "@ribon.io/shared";
import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InsertEmailAccountPage from ".";

jest.mock("hooks/useQueryParams", () => ({
  __esModule: true,
  default: () => ({
    get: () => "1",
  }),
}));

const mockNonProfit = nonProfitFactory({ name: "🌳 Environment", id: 1 });

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useNonProfits: () => ({
    nonProfits: [mockNonProfit],
    refetch: jest.fn(),
  }),
}));

describe("InsertEmailAccountPage", () => {
  it("should render without error", async () => {
    renderComponent(<InsertEmailAccountPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Choose an e-mail to donate");
    expectTextToBeInTheDocument(mockNonProfit.impactByTicket.toString());
    expectTextToBeInTheDocument("Continue");
  });
});
