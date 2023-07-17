import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CheckoutPage from ".";

describe("CheckoutPage", () => {
  it("should render without error", () => {
    renderComponent(<CheckoutPage />);

    expectTextToBeInTheDocument("Change currency");
  });
});
