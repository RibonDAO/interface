import { renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectLogEventToHaveBeenCalledWith,
} from "config/testUtils/expects";
import CheckoutPage from ".";

describe("CheckoutPage", () => {
  it("should render without error", () => {
    renderComponent(<CheckoutPage />);

    expectTextToBeInTheDocument("Change currency");
  });

  it("logs the page view event", () => {
    renderComponent(<CheckoutPage />);

    expectLogEventToHaveBeenCalledWith("P23_view");
  });
});
