import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import causeFactory from "config/testUtils/factories/causeFactory";
import PaymentPage from ".";

describe("PaymentPage", () => {
  it("should render without error", () => {
    const offer = offerFactory();
    const cause = causeFactory();

    renderComponent(<PaymentPage />, {
      locationState: {
        offer,
        cause,
      },
    });

    expectTextToBeInTheDocument(offer.price);
    expectTextToBeInTheDocument(cause.name);
  });
});
