import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import GiveTicketPage from ".";

describe("GiveTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<GiveTicketPage />);
    expectTextToBeInTheDocument("Your donation ticket is available");
    expectTextToBeInTheDocument("Get my ticket");
  });
});
