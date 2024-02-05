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
    expectTextToBeInTheDocument(
      "Grab your reward! Win an extra ticket by downloading our app.",
    );
    expectTextToBeInTheDocument("Stay in browser");
  });

  it("should go back when click in arrow", () => {
    clickOn(screen.getByAltText("back-arrow-button"));

    expectPageToNavigateTo("/causes");
  });
});
