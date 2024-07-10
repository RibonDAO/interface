import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SelectTicketsPage from ".";

describe("SelectTicketsPage", () => {
  it("should render without error", () => {
    renderComponent(<SelectTicketsPage />, {
      ticketsProviderValue: { isLoading: false },
    });

    expectTextToBeInTheDocument("You're about to donate:");
  });
});
