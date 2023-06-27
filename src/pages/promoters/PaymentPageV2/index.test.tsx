import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import PaymentPageV2 from ".";

describe("PaymentPageV2", () => {
  it("should render without error", () => {
    renderComponent(<PaymentPageV2 />);

    expectTextToBeInTheDocument("Change currency");
  });
});
