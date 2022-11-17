import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import DonationDoneCausePage from ".";

describe("DonationDoneCausePage", () => {
  it("should render without error", () => {
    renderComponent(<DonationDoneCausePage />);

    expectTextToBeInTheDocument("You have donated to");
  });
});
