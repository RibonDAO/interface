import { nonProfitFactory } from "@ribon.io/shared/config";
import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InsertEmailAccountPage from ".";

const mockNonProfit = nonProfitFactory({ name: "🌳 Environment", id: 1 });

describe("InsertEmailAccountPage", () => {
  it("should render without error", async () => {
    renderComponent(<InsertEmailAccountPage />, {
      locationState: {
        nonProfit: mockNonProfit,
      },
    });
    await waitForPromises();
    expectTextToBeInTheDocument("Choose an e-mail to donate");
    expectTextToBeInTheDocument(mockNonProfit.impactByTicket.toString());
    expectTextToBeInTheDocument("Continue");
  });
});
