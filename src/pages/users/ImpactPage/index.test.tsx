import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import impactFactory from "config/testUtils/factories/impactFactory";
import { mockRequest } from "config/testUtils/test-helper";
import userFactory from "config/testUtils/factories/userFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import Impact from ".";

describe("Impact", () => {
  describe("when there are no tickets used", () => {
    it("should render title", () => {
      renderComponent(<Impact />);

      expectTextToBeInTheDocument("IMPACT");
    });

    it("should render cardEmptySection", () => {
      renderComponent(<Impact />);

      expectTextToBeInTheDocument("Donate now");
      expectTextToBeInTheDocument(
        "Your donation impact summary will be shown here",
      );
    });
  });

  const user = userFactory({ id: 1 });
  const impacts = [
    impactFactory({ nonProfit: nonProfitFactory({ id: 1 }) }),
    impactFactory({ nonProfit: nonProfitFactory({ id: 2 }) }),
  ];

  describe("when there are more cards to show", () => {
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
      expectTextToBeInTheDocument("Show more");
    });
  });

  describe("when there are no more cards to show", () => {
    beforeEach(() => {
      renderComponent(<Impact />, {
        currentUserProviderValue: {
          currentUser: user,
        },
      });
      mockRequest(`api/v1/users/${user.id}/impacts`, {
        payload: impacts,
      });
    });

    it("shows the show more button", () => {
      expectTextNotToBeInTheDocument("Show more");
    });
  });
});
