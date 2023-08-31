import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { screen } from "@testing-library/react";
import startSupportChat from "services/support";
import { I18NEXTLNG } from "lib/currentLanguage";
import UserSupportBanner from ".";

jest.mock("services/support", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("UserSupportBanner", () => {
  window.open = jest.fn();

  it("should render without error", () => {
    renderComponent(<UserSupportBanner from="test" />);

    expectTextToBeInTheDocument("Access user support");
    expectTextToBeInTheDocument("Questions, ideias, refunds. We’re here!");
  });

  describe("when the banner is clicked in portuguese", () => {
    beforeEach(() => {
      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      setLocalStorageItem(I18NEXTLNG, "pt-BR");

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

  describe("when the banner is clicked in English", () => {
    beforeEach(() => {
      Object.defineProperty(window, "navigator", {
        value: { language: "en" },
      });
      setLocalStorageItem(I18NEXTLNG, "en");

      renderComponent(<UserSupportBanner from="test" />);
      const banner = screen.getByTestId("banner");

      clickOn(banner);
    });

    it("starts the support chat", () => {
      expect(startSupportChat).toHaveBeenCalled();
    });
  });
});
