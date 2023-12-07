import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ExtraTicketPage from ".";

describe("ExtraTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<ExtraTicketPage />);

    expectTextToBeInTheDocument("You won an extra ticket");
    expectTextToBeInTheDocument("Validate later");
  });
});
