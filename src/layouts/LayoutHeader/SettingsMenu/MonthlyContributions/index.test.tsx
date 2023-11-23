import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MonthlyContributions from ".";

describe("MonthlyContributions component", () => {
  it("renders the correct text", () => {
    renderComponent(<MonthlyContributions />, {
      currentUserProviderValue: {
        currentUser: { id: 1, email: "juju@ribon.io", lastDonationAt: "true" },
      },
    });
    expectTextToBeInTheDocument("Monthly contributions");
  });
});
