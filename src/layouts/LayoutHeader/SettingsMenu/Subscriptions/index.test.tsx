import { renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import Subscriptions from ".";

describe("Subscriptions component", () => {
  describe("when there is a user", () => {
    beforeEach(() => {
      renderComponent(<Subscriptions />, {
        currentUserProviderValue: {
          currentUser: {
            id: 1,
            email: "user@ribon.io",
            lastDonationAt: "true",
          },
        },
      });
    });

    it("renders the correct text", () => {
      expectTextToBeInTheDocument("Subscriptions");
    });
  });

  describe("when there is not a user", () => {
    it("does not render the component when there is no user", () => {
      renderComponent(<Subscriptions />, {
        currentUserProviderValue: {
          currentUser: undefined,
        },
      });
      expectTextNotToBeInTheDocument("Subscriptions");
    });
  });
});
