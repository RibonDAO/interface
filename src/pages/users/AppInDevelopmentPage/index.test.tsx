import { clickOn, renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import {
  expectPageToNavigateBack,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import AppInDevelopmentPage from ".";

describe("App In Development Page", () => {
  beforeEach(() => {
    renderComponent(<AppInDevelopmentPage />);
  });

  it("should render the app in development page", () => {
    expectTextToBeInTheDocument("App in development");

    expectTextToBeInTheDocument(
      "Don't worry, we’ll remember you to download it when its released",
    );
    expectTextToBeInTheDocument("Take this survey and help us build the app");
    expectTextToBeInTheDocument("Take survey");
  });

  it("should go back when click in arrow", () => {
    clickOn(screen.getByAltText("back-arrow-button"));

    expectPageToNavigateBack();
  });
});
