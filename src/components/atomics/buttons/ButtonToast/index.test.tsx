import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ButtonToast from ".";

describe("DownloadAppToast", () => {
  it("should render without error", () => {
    renderComponent(
      <ButtonToast text="Get app" leftIcon="leftIcon.png" onClick={() => {}} />,
    );

    expectTextToBeInTheDocument("Get app");
  });
});
