import { clickOn, renderComponent } from "config/testUtils";
import impactFactory from "config/testUtils/factories/impactFactory";
import { mockRequest } from "config/testUtils/test-helper";
import userFactory from "config/testUtils/factories/userFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { UserStatistics } from "types/entities/userStatistics";
import userStatisticsFactory from "config/testUtils/factories/userStatisticsFactory";
import Impact from ".";

describe("Impact Page", () => {
  describe("Total Impact Cards", () => {
    const user = userFactory({ id: 1 });
    const userStatistics = userStatisticsFactory();

    describe("when there are more cards to show", () => {
      beforeEach(() => {
        renderComponent(<Impact />, {
          currentUserProviderValue: {
            currentUser: user,
          },
        });
        mockRequest(`api/v1/users/${user.id}/statistics`, {
          payload: userStatistics as UserStatistics,
        });
      });

      it("should render the imp", () => {
        expectTextToBeInTheDocument(userStatistics.totalTickets.toString());
        expectTextToBeInTheDocument("Donated tickets");

        expectTextToBeInTheDocument("R$ 15,00");
        expectTextToBeInTheDocument("Donated money");

        expectTextToBeInTheDocument(userStatistics.totalNonProfits.toString());
        expectTextToBeInTheDocument("Supported NGOs");
        expectTextToBeInTheDocument(userStatistics.totalCauses.toString());

        expectTextToBeInTheDocument("Supporter causes");
      });
    });
  });

  describe("Ticket Donations", () => {
    describe("when there are no tickets used", () => {
      it("should render title", () => {
        renderComponent(<Impact />);

        expectTextToBeInTheDocument("Impact");
        expectTextToBeInTheDocument("Your ticket donations will appear here.");
        expectTextToBeInTheDocument(
          "You have not made free donations using tickets yet, why not try your first one?",
        );
        expectTextToBeInTheDocument("Donate using tickets");
      });
      describe("when the donate using tickets button is clicked", () => {
        it("should navigate to causes page", () => {
          renderComponent(<Impact />);
          clickOn("Donate using tickets");
          expectTextToBeInTheDocument("Donate using tickets");
        });
      });
    });

    const user = userFactory({ id: 1 });
    const impact = [impactFactory({ nonProfit: nonProfitFactory({ id: 1 }) })];

    describe("when there are  cards to show", () => {
      beforeEach(() => {
        renderComponent(<Impact />, {
          currentUserProviderValue: {
            currentUser: user,
          },
        });
        mockRequest(`api/v1/users/${user.id}/impacts`, {
          payload: [...impact],
        });
      });

      it("shows the impact cards", () => {
        expectTextToBeInTheDocument("1 Impact description");
      });
    });
  });
});
