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
        expectTextToBeInTheDocument("Donate");
      });
      describe("when the donate directly button is clicked", () => {
        beforeEach(() => {
          renderComponent(<DirectSection />);
          clickOn("Donate");
        });

        it("should navigate to causes page", () => {
          expectPageToNavigateTo("/promoters/checkout", {
            search: "offer=0&target=non_profit&target_id=&currency=USD",
          });
        });
      });
    });
  });
});
