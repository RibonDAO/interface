import { clickOn, renderComponent } from "config/testUtils";

import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";

import TicketSection from ".";

describe("Impact Page", () => {
  describe("Ticket Donations", () => {
    describe("when there are no tickets used", () => {
      it("should render title", () => {
        renderComponent(<TicketSection />);

        expectTextToBeInTheDocument("Your ticket donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made free donations using tickets yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate using tickets");
      });
      describe("when the donate using tickets button is clicked", () => {
        it("should navigate to causes page", () => {
          renderComponent(<TicketSection />);
          expectTextToBeInTheDocument("Donate using tickets");
          clickOn("Donate using tickets");
          expectPageToNavigateTo("/causes");
        });
      });
    });
  });
});
