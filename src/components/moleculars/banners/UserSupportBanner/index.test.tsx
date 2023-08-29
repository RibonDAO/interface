import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import UserSupportBanner from ".";

describe("UserSupportBanner", () => {
  window.open = jest.fn();

  it("should render without error", () => {
    renderComponent(<UserSupportBanner from="test" />);

    expectTextToBeInTheDocument("Access user support");
    expectTextToBeInTheDocument("Questions, ideias, refunds. We’re here!");
  });

  describe("when the banner is clicked", () => {
    beforeEach(() => {
      renderComponent(<UserSupportBanner from="test" />);
      const banner = screen.getByTestId("banner");

      clickOn(banner);
    });

    it("opens the support link", () => {
      expect(window.open).toHaveBeenCalled();
    });

    it("logs the supportBtn_click event", () => {
      expectLogEventToHaveBeenCalledWith("supportBtn_click", { from: "test" });
    });
  });
});
