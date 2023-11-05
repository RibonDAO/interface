import { renderComponent } from "config/testUtils";
import { nonProfitFactory } from "@ribon.io/shared/config";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InsertEmailAccountPage from ".";

describe("InsertEmailAccountPage", () => {
  const nonProfit = nonProfitFactory();

  beforeEach(() => {
    renderComponent(<InsertEmailAccountPage />, {
      locationState: {
        nonProfit,
      },
    });
  });
  it("should render without error", () => {
    expectTextToBeInTheDocument("Choose an e-mail to donate");
    expectTextToBeInTheDocument(nonProfit.impactByTicket.toString());
    expectTextToBeInTheDocument("Continue");
  });
});
