import { clickOn, renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import AppDownloadPage from ".";

describe("App Download Page", () => {
  beforeEach(() => {
    renderComponent(<AppDownloadPage />);
  });

  it("should render the app download page", () => {
    expectTextToBeInTheDocument("Get a new ticket");

    expectTextToBeInTheDocument("Download the app and get an extra ticket");
    expectTextToBeInTheDocument("Use QR Code");
    expectTextToBeInTheDocument("Choose a store");
    expectTextToBeInTheDocument("Go back");
  });

  it("should go back when click in arrow", () => {
    clickOn(screen.getByAltText("back-arrow-button"));

    expectPageToNavigateTo("/causes");
  });
});
