import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { usePixPaymentInformation } from ".";

function PixPaymentInformationTestPage() {
  usePixPaymentInformation();
  return <div>PixPayment</div>;
}

describe("usePixPayment", () => {
  it("renders without error", () => {
    renderComponent(<PixPaymentInformationTestPage />);
    expectTextToBeInTheDocument("PixPayment");
  });
});
