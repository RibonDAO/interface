import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SupportTreasurePage from ".";

describe("SupportTreasurePage", () => {
  beforeEach(async () => {
    renderComponent(<SupportTreasurePage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Make a bigger impact");
  });

  it("logs the treasureSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("treasureSupportScreen_view");
  });

  describe("when the option toggle is changed", () => {
    it("logs the treasureSupportGivingTogBtn_click event", () => {
      clickOn("Cryptocurrency");

      expectLogEventToHaveBeenCalledWith("treasureSupportGivingTogBtn_click", {
        option: "cryptocurrency",
      });
    });

    it("should render card form", () => {
      expectTextToBeInTheDocument("Choose your giving");
      expectTextToBeInTheDocument("Proceed to Checkout");
    });

    it("should render cryptocurrency section", () => {
      clickOn("Cryptocurrency");

      expectTextToBeInTheDocument("Connect your wallet");
      expectTextToBeInTheDocument("Connect wallet");
    });
  });
});
