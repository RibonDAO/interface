import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { usePaymentInformation } from ".";

function PaymentInformationTestPage() {
  usePaymentInformation();
  return <div>PaymentInformation</div>;
}

describe("usePaymentInformation", () => {
  it("renders without error", () => {
    renderComponent(<PaymentInformationTestPage />);
    expectTextToBeInTheDocument("PaymentInformation");
  });
});
