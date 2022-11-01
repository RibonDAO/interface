import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import offerFactory from "config/testUtils/factories/offerFactory";
import { formatPrice } from "lib/formatters/currencyFormatter";
import OfferSelectionSection from ".";

const mockOffer = offerFactory();
jest.mock("hooks/apiHooks/useOffers", () => ({
  __esModule: true,
  default: () => ({
    offers: [mockOffer],
    refetch: jest.fn(),
  }),
}));

describe("OfferSelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <OfferSelectionSection cause={causeFactory()} onOfferChange={mockFn} />,
    );
  });

  it("show the first offer", () => {
    expectTextToBeInTheDocument(
      formatPrice(mockOffer.priceValue, mockOffer.currency),
    );
  });
});
