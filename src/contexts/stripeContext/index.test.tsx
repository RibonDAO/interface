import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useStripe } from ".";

function StripeTestPage() {
  useStripe();
  return <div>Stripe</div>;
}

describe("useStripe", () => {
  it("renders without error", () => {
    renderComponent(<StripeTestPage />);
    expectTextToBeInTheDocument("Stripe");
  });
});
