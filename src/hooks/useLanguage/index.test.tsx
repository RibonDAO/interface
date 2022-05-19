import React from "react";
import { renderComponent, waitForPromises } from "config/testUtils";
import { screen, fireEvent } from "@testing-library/react";
import { setLocalStorageItem } from "lib/localStorage";
import { LANGUAGE_KEY, useLanguage } from ".";

function TestPage() {
  const { currentLang, handleSwitchLanguage } = useLanguage();

  return (
    <div>
      <button type="button" onClick={handleSwitchLanguage}>
        change language
      </button>
      <p>{currentLang}</p>
    </div>
  );
}

describe("useLanguage", () => {
  describe("when there is no language defined", () => {
    it("gets the default language of the browser", async () => {
      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      renderComponent(<TestPage />);

      expect(screen.getByText("pt-BR")).toBeInTheDocument();
    });
  });

  describe("when there is language defined", () => {
    it("gets the default language from localStorage", async () => {
      setLocalStorageItem(LANGUAGE_KEY, "en-US");
      renderComponent(<TestPage />);

      expect(screen.getByText("en-US")).toBeInTheDocument();
    });
  });

  describe("#handleSwitchLanguage", () => {
    it("switches the current language", async () => {
      Object.defineProperty(window, "location", {
        value: {
          reload: jest.fn(),
        },
      });
      setLocalStorageItem(LANGUAGE_KEY, "en-US");
      renderComponent(<TestPage />);
      expect(screen.getByText("en-US")).toBeInTheDocument();

      fireEvent.click(screen.getByText("change language"));
      await waitForPromises();

      expect(screen.getByText("pt-BR")).toBeInTheDocument();
    });
  });
});
