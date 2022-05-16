import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SupportFundPage from ".";

describe("SupportFundPage", () => {
  it("should render without error", () => {
    renderComponent(<SupportFundPage />);

    expectTextToBeInTheDocument("Support the Fund");
  });

  it("logs the fundSupportScreen_view event", () => {
    renderComponent(<SupportFundPage />);

    expectLogEventToHaveBeenCalledWith("fundSupportScreen_view");
  });

  describe("when the option toggle is changed", () => {
    it("logs the fundSupportGivingTogBtn_click event", () => {
      renderComponent(<SupportFundPage />);
      clickOn("Cryptocurrency");

      expectLogEventToHaveBeenCalledWith("fundSupportGivingTogBtn_click", {
        option: "cryptocurrency",
      });
    });

    it("should render card form", () => {
      renderComponent(<SupportFundPage />);

      expectTextToBeInTheDocument("Choose your giving");
      expectTextToBeInTheDocument("Next");
    });

    it("should render cryptocurrency form", () => {
      renderComponent(<SupportFundPage />);
      clickOn("Cryptocurrency");

      expectTextToBeInTheDocument("How much do you want to give?");
      expectTextToBeInTheDocument("Enter any USDC amount");
    });
  });
});
