import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TicketIconText from ".";

describe("TicketIconText", () => {
  it("should render without error", () => {
    renderComponent(<TicketIconText quantity={10} onClick={jest.fn()} />);

    expectTextToBeInTheDocument("10");
  });
});
