import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import TreasurePage from ".";

describe("TreasurePage", () => {
  it("should render without error", () => {
    renderComponent(<TreasurePage />);

    expectTextToBeInTheDocument("Donation treasure");
  });

  it("logs the treasureScreen_view event when loaded", () => {
    renderComponent(<TreasurePage />);

    expectLogEventToHaveBeenCalledWith("treasureScreen_view");
  });

  describe("when there is a wallet connected", () => {
    beforeEach(() => {
      renderComponent(<TreasurePage />, {
        walletProviderValue: {
          wallet: "0xFFFF",
        },
      });
    });

    describe("when the support treasure button is clicked", () => {
      beforeEach(() => {
        clickOn("Support the treasure");
      });

      it("logs the treasureSupportBtn_click event", () => {
        expectLogEventToHaveBeenCalledWith("treasureSupportBtn_click", {
          from: "treasureBalance",
        });
      });

      it("navigates to the support treasure page", () => {
        expectPageToNavigateTo("/promoters/support-treasure");
      });
    });
  });
});
