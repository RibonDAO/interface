import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import { mockNewLogEventFunction } from "setupTests";
import { setLocalStorageItem } from "lib/localStorage";
import { I18NEXTLNG } from "lib/currentLanguage";
import startSupportChat from "services/support";
import ModalIcon from ".";

jest.mock("services/support", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ModalIcon", () => {
  it("should render without error", () => {
    renderComponent(<ModalIcon title="ModalIcon" visible />);

    expectTextToBeInTheDocument("ModalIcon");
  });

  describe("when has passed a function on buttons", () => {
    it("calls the passed function when clicked primary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          primaryButton={{
            text: "button",
            onClick: mockFunction,
          }}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });

    it("calls the passed function when clicked secondary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          secondaryButton={{
            text: "button",
            onClick: mockFunction,
          }}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe("when has a icon", () => {
    it("renders bigger icon", () => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon="icon" biggerIcon />,
      );

      expect(screen.getByAltText("icon")).toBeDefined();
    });

    it("renders round icon", () => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon="icon" roundIcon />,
      );

      expect(screen.getByAltText("icon")).toBeDefined();
    });
  });

  describe("when has a highlighted text", () => {
    it("renders highlighted text", () => {
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          highlightedText="highlighted text"
          body="body"
        />,
      );

      expect(screen.getByText("highlighted text")).toBeDefined();
    });
  });

  describe("when the component is not visible and don't have title", () => {
    it("does not show", () => {
      renderComponent(<ModalIcon />);
      expectTextNotToBeInTheDocument("ModalIcon");
    });
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
      renderComponent(
        <ModalIcon visible eventName={eventName} eventParams={eventParams} />,
      );
      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        action,
        eventName,
        eventParams,
      );
    });
  });

  describe("when the support button is clicked in portuguese", () => {
    beforeEach(() => {
      window.open = jest.fn();

      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      setLocalStorageItem(I18NEXTLNG, "pt-BR");

      renderComponent(<ModalIcon title="text" visible supportButton />);
      const button = screen.getByText("Access user support");

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

      renderComponent(<ModalIcon title="text" visible supportButton />);
      const button = screen.getByText("Access user support");

      clickOn(button);
    });

    it("starts the support chat", () => {
      expect(startSupportChat).toHaveBeenCalled();
    });
  });
});
