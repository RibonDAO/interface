import { clickOn, renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import AppInDevelopmentPage from ".";

describe("App In Development Page", () => {
  describe("Total Impact Cards", () => {
    describe("when there are more cards to show", () => {
      beforeEach(() => {
        renderComponent(<AppInDevelopmentPage />);
      });

      it("should render the imp", () => {
        expectTextToBeInTheDocument("App in development");

        expectTextToBeInTheDocument(
          "Don't worry, we’ll remember you to download it when its released",
        );
        expectTextToBeInTheDocument(
          "Take this survey and help us build the app",
        );
        expectTextToBeInTheDocument("Take survey");
      });
    });
  });
});
