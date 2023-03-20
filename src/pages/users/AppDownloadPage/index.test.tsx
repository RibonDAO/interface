import { clickOn, renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import {
  expectPageToNavigateBack,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import AppDownloadPage from ".";

describe("App Download Page", () => {
  beforeEach(() => {
    renderComponent(<AppDownloadPage />);
  });

  it("should render the app download page", () => {
    expectTextToBeInTheDocument("Get Ribon's Beta mobile app");

    expectTextToBeInTheDocument("Scan QR Code");
    expectTextToBeInTheDocument("Choose a store");
    expectTextToBeInTheDocument("Paste this link on your mobile browser");
    expectTextToBeInTheDocument("Go back");
  });

  it("should go back when click in arrow", () => {
    clickOn(screen.getByAltText("back-arrow-button"));

    expectPageToNavigateBack();
  });
});
