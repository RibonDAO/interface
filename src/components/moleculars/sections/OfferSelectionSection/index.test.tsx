import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import OfferSelectionSection from ".";

describe("OfferSelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <OfferSelectionSection
        offers={[
          offerFactory({ price: "$5,00", id: 1 }),
          offerFactory({ price: "$10,00", id: 2 }),
          offerFactory({ price: "$15,00", id: 3 }),
        ]}
        currentOffer={offerFactory({ price: "$10,00", id: 2 })}
        onOfferChange={mockFn}
        showAvailableValues
      />,
    );
  });

  it("Shows available values", () => {
    expectTextToBeInTheDocument("$5,00");
    expectTextToBeInTheDocument("$10,00");
    expectTextToBeInTheDocument("$15,00");
  });
});
