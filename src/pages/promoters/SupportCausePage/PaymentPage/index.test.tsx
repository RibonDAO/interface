import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import causeFactory from "config/testUtils/factories/causeFactory";
import PaymentPage from ".";

describe("PaymentPage", () => {
  it("should render without error", () => {
    renderComponent(<PaymentPage />, {
      locationState: {
        offer: offerFactory(),
        cause: causeFactory(),
      },
    });

    expectTextToBeInTheDocument(
      "How does the community increases your R$ 20,00 donation?",
    );
  });
});
