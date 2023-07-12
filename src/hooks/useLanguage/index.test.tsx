import React from "react";
import { renderComponent, waitForPromises } from "config/testUtils";
import { screen, fireEvent } from "@testing-library/react";
import { mockRequest } from "config/testUtils/test-helper";
import { setLocalStorageItem } from "lib/localStorage";
import { I18NEXTLNG } from "lib/currentLanguage";
import { useLanguage } from ".";

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
    beforeEach(() => {
      window.localStorage.clear();
    });
    it("gets the default language of the browser", async () => {
      Object.defineProperty(window, "navigator", {
        value: { language: "pt-BR" },
      });
      renderComponent(<TestPage />);

      expect(screen.getByText("pt-BR")).toBeInTheDocument();
    });
  });

  describe("when there is language defined", () => {
    it("gets the english language from localStorage", async () => {
      setLocalStorageItem(I18NEXTLNG, "en");
      renderComponent(<TestPage />);
      expect(screen.getByText("en")).toBeInTheDocument();
    });
    it("gets the portuguese language from localStorage", async () => {
      setLocalStorageItem(I18NEXTLNG, "pt-BR");
      renderComponent(<TestPage />);
      expect(screen.getByText("pt-BR")).toBeInTheDocument();
    });
  });

  describe("#handleSwitchLanguage", () => {
    mockRequest("/api/v1/users/update_streak", {
      method: "POST",
      payload: {
        streak: 1,
      },
    });
    beforeEach(async () => {
      setLocalStorageItem(I18NEXTLNG, "en");
      renderComponent(<TestPage />);
      await waitForPromises();
    });
    it("switches the current language", async () => {
      expect(screen.getByText("en")).toBeInTheDocument();

      fireEvent.click(screen.getByText("change language"));
      await waitForPromises();

      expect(screen.getByText("pt-BR")).toBeInTheDocument();
    });
  });
});
