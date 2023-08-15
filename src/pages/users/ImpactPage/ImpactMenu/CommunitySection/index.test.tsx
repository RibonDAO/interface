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
        expectTextToBeInTheDocument("Donate");
      });
      describe("when the donate in community button is clicked", () => {
        beforeEach(() => {
          renderComponent(<CommunitySection />);
          clickOn("Donate");
        });

        it("should navigate to causes page", () => {
          expectPageToNavigateTo("/promoters/checkout", {
            search: "offer=0&target=cause&target_id=&currency=USD",
          });
        });
      });
    });
  });
});
