import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import DownloadAppToast from ".";

describe("DownloadAppToast", () => {
  it("should render without error", () => {
    renderComponent(<DownloadAppToast />);

    expectTextToBeInTheDocument("Get app");
  });
});
