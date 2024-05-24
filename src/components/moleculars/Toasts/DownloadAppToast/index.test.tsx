import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import DownloadAppToast from ".";

describe("DownloadAppToast", () => {
  it("should render without error", () => {
    renderComponent(<DownloadAppToast />);

    expectTextToBeInTheDocument("Get app");
  });

  it("navigates to the correct page when clicked", () => {
    renderComponent(<DownloadAppToast />);
    clickOn("Get app");

    expectPageToNavigateTo("/app-download", {
      search:
        "utm_source=ribonweb_en&utm_medium=floating_btn&utm_campaign=desktop",
    });
  });
});
