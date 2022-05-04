import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import DonationInProcessPage from ".";

describe("DonationInProcessPage", () => {
  it("should render without error", () => {
    renderComponent(<DonationInProcessPage />);

    expectTextToBeInTheDocument("Donating...");
    expectTextToBeInTheDocument(
      "Ribon’s supporters are those responsible for paying for the free donations",
    );
  });
});
