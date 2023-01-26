import { renderComponent } from "config/testUtils";
import impactFactory from "config/testUtils/factories/impactFactory";
import { mockRequest } from "config/testUtils/test-helper";
import userFactory from "config/testUtils/factories/userFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";

import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
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
      });
    });

    const user = userFactory({ id: 1 });
    const impacts = [
      impactFactory({ nonProfit: nonProfitFactory({ id: 1 }) }),
      impactFactory({ nonProfit: nonProfitFactory({ id: 2 }) }),
      impactFactory({ nonProfit: nonProfitFactory({ id: 3 }) }),
      impactFactory({ nonProfit: nonProfitFactory({ id: 4 }) }),
      impactFactory({ nonProfit: nonProfitFactory({ id: 5 }) }),
      impactFactory({ nonProfit: nonProfitFactory({ id: 6 }) }),
    ];

    describe("when there are  cards to show", () => {
      beforeEach(() => {
        renderComponent(<Impact />, {
          currentUserProviderValue: {
            currentUser: user,
          },
        });
        mockRequest(`api/v1/users/${user.id}/impacts`, {
          payload: [
            ...impacts,
            impactFactory({ nonProfit: nonProfitFactory({ id: 3 }) }),
          ],
        });
      });

      it("shows the show more button", () => {
        expectTextNotToBeInTheDocument("Show more");
      });
    });
  });
});
