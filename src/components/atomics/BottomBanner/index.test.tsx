import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import BottomBanner from ".";

describe("DownloadAppToast", () => {
  it("should render without error", () => {
    renderComponent(
      <BottomBanner
        text="Our app is available on Android and iOS"
        ctaText="Get App"
        onClick={() => {}}
      />,
    );

    expectTextToBeInTheDocument("Get App");
  });
});
