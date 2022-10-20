import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TicketWithTextAndImage from ".";

describe("TicketWithTextAndImage", () => {
  it("should render without error", () => {
    renderComponent(<TicketWithTextAndImage />);

    expectTextToBeInTheDocument("TicketWithTextAndImage");
  });
});
