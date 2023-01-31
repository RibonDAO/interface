import { clickOn, renderComponent } from "config/testUtils";

import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import CommunitySection from ".";

describe("Impact Page", () => {
  describe("Community Donations", () => {
    describe("when there are no community donations", () => {
      it("should render title", () => {
        renderComponent(<CommunitySection />);

        expectTextToBeInTheDocument(
          "Your community donations will appear here.",
        );
        expectTextToBeInTheDocument(
          "You have not made community donations yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate in community");
      });
      describe("when the donate in community button is clicked", () => {
        it("should navigate to causes page", () => {
          renderComponent(<CommunitySection />);
          expectTextToBeInTheDocument("Donate in community");
          clickOn("Donate in community");
          expectPageToNavigateTo("/promoters/support-cause");
        });
      });
    });
  });
});
