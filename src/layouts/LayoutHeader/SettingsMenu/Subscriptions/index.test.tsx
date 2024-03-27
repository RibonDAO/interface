import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Subscriptions from ".";

describe("Subscriptions component", () => {
  it("renders the correct text", () => {
    renderComponent(<Subscriptions />, {
      currentUserProviderValue: {
        currentUser: { id: 1, email: "user@ribon.io", lastDonationAt: "true" },
      },
    });
    expectTextToBeInTheDocument("Monthly contributions");
  });
});
