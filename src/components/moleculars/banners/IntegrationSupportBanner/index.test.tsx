import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { screen } from "@testing-library/react";
import { I18NEXTLNG } from "lib/currentLanguage";
import IntegrationSupportBanner from ".";

jest.mock("services/support", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("IntegrationSupportBanner", () => {
  window.open = jest.fn();

  it("should render without error", () => {
    renderComponent(<IntegrationSupportBanner />);

    expectTextToBeInTheDocument("Need help?");
  });

  describe("when the banner is clicked in portuguese", () => {
    beforeEach(() => {
      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      setLocalStorageItem(I18NEXTLNG, "pt-BR");

      renderComponent(<IntegrationSupportBanner />);
      const banner = screen.getByTestId("banner");

      clickOn(banner);
    });

    it("opens the support link", () => {
      expect(window.open).toHaveBeenCalled();
    });

    it("logs the integrationSupportBtn_click event", () => {
      expectLogEventToHaveBeenCalledWith("integrationSupportBtn_click");
    });
  });

  describe("when the banner is clicked in English", () => {
    beforeEach(() => {
      Object.defineProperty(window, "navigator", {
        value: { language: "en" },
      });
      setLocalStorageItem(I18NEXTLNG, "en");

      renderComponent(<IntegrationSupportBanner />);
      const banner = screen.getByTestId("banner");

      clickOn(banner);
    });

    it("opens the support link", () => {
      expect(window.open).toHaveBeenCalled();
    });
  });
});
