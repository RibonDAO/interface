import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TicketsCounter from ".";

describe("TicketsCounter", () => {
  it("renders without error", () => {
    renderComponent(<TicketsCounter />);

    expectTextToBeInTheDocument("1");
  });
});
