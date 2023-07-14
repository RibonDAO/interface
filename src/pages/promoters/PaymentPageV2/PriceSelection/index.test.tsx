import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import PriceSelection from ".";

const mockOffer = offerFactory({
  price: "$10.00",
});

describe("PriceSelection", () => {
  it("should render without error", () => {
    renderComponent(
      <PriceSelection currentOffer={mockOffer} onEditClick={() => {}} />,
    );

    expectTextToBeInTheDocument("$10.00");
  });
});
