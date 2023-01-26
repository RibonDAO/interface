import { renderComponent } from "config/testUtils";
import impactFactory from "config/testUtils/factories/impactFactory";
import { mockRequest } from "config/testUtils/test-helper";
import userFactory from "config/testUtils/factories/userFactory";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { UserStatistics } from "types/entities/userStatistics";
import Impact from ".";

describe("Impact", () => {
  const user = userFactory({ id: 1 });
  const impacts = impactFactory();

  describe("when there are more cards to show", () => {
    beforeEach(() => {
      renderComponent(<Impact />, {
        currentUserProviderValue: {
          currentUser: user,
        },
      });
      mockRequest(`api/v1/users/${user.id}/statistics`, {
        payload: impacts as UserStatistics,
      });
    });

    it("should render the imp", () => {
      expectTextToBeInTheDocument(impacts.totalTickets.toString());
      expectTextToBeInTheDocument("Donated tickets");

      expectTextToBeInTheDocument("R$ 15,00");
      expectTextToBeInTheDocument("Donated money");

      expectTextToBeInTheDocument(impacts.totalNonProfits.toString());
      expectTextToBeInTheDocument("Supported NGOs");
      expectTextToBeInTheDocument(impacts.totalCauses.toString());

      expectTextToBeInTheDocument("Supporter causes");
    });
  });
});
