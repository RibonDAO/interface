import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SignInExtraTicketPage from ".";

describe("SignInExtraTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<SignInExtraTicketPage />);

    expectTextToBeInTheDocument("You won an extra ticket");
  });
});
