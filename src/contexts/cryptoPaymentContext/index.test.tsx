import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useCryptoPayment } from ".";

function CryptoPaymentTestPage() {
  useCryptoPayment();
  return <div>CryptoPayment</div>;
}

describe("useCryptoPayment", () => {
  it("renders without error", () => {
    renderComponent(<CryptoPaymentTestPage />);
    expectTextToBeInTheDocument("CryptoPayment");
  });
});
