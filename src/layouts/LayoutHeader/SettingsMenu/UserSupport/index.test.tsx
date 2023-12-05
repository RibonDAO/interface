import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { I18NEXTLNG } from "lib/currentLanguage";
import { screen } from "@testing-library/react";
import startSupportChat from "services/support";
import UserSupportItem from ".";

jest.mock("services/support", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("UserSupportItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<UserSupportItem />);
    expectTextToBeInTheDocument("User support");
  });

  describe("when the support button is clicked in portuguese", () => {
    beforeEach(() => {
      window.open = jest.fn();

      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      setLocalStorageItem(I18NEXTLNG, "pt-BR");

      renderComponent(<UserSupportItem />);
      const button = screen.getByText("User support");

      clickOn(button);
    });

    it("opens the support link", () => {
      expect(window.open).toHaveBeenCalled();
    });
  });

  describe("when the support button is clicked in English", () => {
    beforeEach(() => {
      Object.defineProperty(window, "navigator", {
        value: { language: "en" },
      });
      setLocalStorageItem(I18NEXTLNG, "en");

      renderComponent(<UserSupportItem />);
      const button = screen.getByText("User support");

      clickOn(button);
    });

    it("starts the support chat", () => {
      expect(startSupportChat).toHaveBeenCalled();
    });
  });
});
