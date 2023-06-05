import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ReceiveTicketPage from ".";

describe("ReceiveTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<ReceiveTicketPage />);

    expectTextToBeInTheDocument("Receiving ticket...");
  });
});
