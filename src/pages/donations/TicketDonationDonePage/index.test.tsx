import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TicketDonationDonePage from ".";

describe("TicketDonationDonePage", () => {
  it("should render without error", () => {
    renderComponent(<TicketDonationDonePage />);

    expectTextToBeInTheDocument("TicketDonationDonePage");
  });
});
