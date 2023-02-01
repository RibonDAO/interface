import { clickOn, renderComponent } from "config/testUtils";

import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import DirectSection from ".";

describe("Impact Page", () => {
  describe("Direct Donations", () => {
    describe("when there are no direct donations", () => {
      it("should render title", () => {
        renderComponent(<DirectSection />);

        expectTextToBeInTheDocument("Your direct donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made direct donations yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate directly");
      });
      describe("when the donate directly button is clicked", () => {
        it("should navigate to causes page", () => {
          renderComponent(<DirectSection />);
          expectTextToBeInTheDocument("Donate directly");
          clickOn("Donate directly");
          expectPageToNavigateTo("/promoters/support-non-profit");
        });
      });
    });
  });
});
