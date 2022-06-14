import { screen, waitFor } from "@testing-library/react";
import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import React from "react";
import ChangeLanguageItem from ".";

describe("ChangeLanguageItem", () => {
  it("should switch language", async () => {
    renderComponent(<ChangeLanguageItem />);

    Object.defineProperty(window, "location", {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });

    clickOn(screen.getByRole("switch"));

    await waitFor(() => expectTextToBeInTheDocument("PT"));
  });
});
