import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import FundPage from ".";

describe("FundPage", () => {
  it("should render without error", () => {
    renderComponent(<FundPage />);

    expectTextToBeInTheDocument("Treasure");
  });

  it("logs the fundScreen_view event when loaded", () => {
    renderComponent(<FundPage />);

    expectLogEventToHaveBeenCalledWith("fundScreen_view");
  });

  describe("when there is a wallet connected", () => {
    beforeEach(() => {
      renderComponent(<FundPage />, {
        walletProviderValue: {
          wallet: "0xFFFF",
        },
      });
    });

    describe("when the support fund button is clicked", () => {
      beforeEach(() => {
        clickOn("Support the fund");
      });

      it("logs the fundSupportBtn_click event", () => {
        expectLogEventToHaveBeenCalledWith("fundSupportBtn_click", {
          from: "fundBalance",
        });
      });

      it("navigates to the support fund page", () => {
        expectPageToNavigateTo("/promoters/support-fund");
      });
    });
  });
});
