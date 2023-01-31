import { clickOn, renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactMenu from ".";

describe("Impact Page", () => {
  describe("Impact menu", () => {
    describe("when there are no tickets used", () => {
      it("should render ticket section when render impact menu", () => {
        renderComponent(<ImpactMenu />);

        expectTextToBeInTheDocument("Your ticket donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made free donations using tickets yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate using tickets");
      });

      it("should render ticket section when click in ticket tab", () => {
        renderComponent(<ImpactMenu />);

        clickOn("Ticket donations");

        expectTextToBeInTheDocument("Your ticket donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made free donations using tickets yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate using tickets");
      });

      it("should render direct donations section when click in community tab", () => {
        renderComponent(<ImpactMenu />);

        clickOn("Direct donations");

        expectTextToBeInTheDocument("Your direct donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made direct donations yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate directly");
      });

      it("should render community donations section when click in community tab", () => {
        renderComponent(<ImpactMenu />);

        clickOn("Community donations");

        expectTextToBeInTheDocument(
          "Your community donations will appear here.",
        );
        expectTextToBeInTheDocument(
          "You have not made community donations yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate in community");
      });
    });
  });
});
