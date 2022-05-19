import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SupportFundPage from ".";

describe("SupportFundPage", () => {
  beforeEach(async () => {
    renderComponent(<SupportFundPage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Support the Fund");
  });

  it("logs the fundSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("fundSupportScreen_view");
  });

  describe("when the option toggle is changed", () => {
    it("logs the fundSupportGivingTogBtn_click event", () => {
      clickOn("Cryptocurrency");

      expectLogEventToHaveBeenCalledWith("fundSupportGivingTogBtn_click", {
        option: "cryptocurrency",
      });
    });

    it("should render card form", () => {
      expectTextToBeInTheDocument("Choose your giving");
      expectTextToBeInTheDocument("Next");
    });

    it("should render cryptocurrency form", () => {
      clickOn("Cryptocurrency");

      expectTextToBeInTheDocument("How much do you want to give?");
      expectTextToBeInTheDocument("Enter any USDC amount");
    });
  });
});
