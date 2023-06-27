import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import OfferSelection from ".";

const mockOffer = offerFactory({
  price: "$10.00",
});

describe("OfferSelection", () => {
  it("should render without error", () => {
    renderComponent(
      <OfferSelection currentOffer={mockOffer} handleOfferChange={() => {}} />,
    );

    expectTextToBeInTheDocument("$10.00");
  });
});
