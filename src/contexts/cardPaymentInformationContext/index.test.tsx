import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useCardPaymentInformation } from ".";

function CardPaymentInformationTestPage() {
  useCardPaymentInformation();
  return <div>CardPaymentInformation</div>;
}

describe("useCardPaymentInformation", () => {
  it("renders without error", () => {
    renderComponent(<CardPaymentInformationTestPage />);
    expectTextToBeInTheDocument("CardPaymentInformation");
  });
});
