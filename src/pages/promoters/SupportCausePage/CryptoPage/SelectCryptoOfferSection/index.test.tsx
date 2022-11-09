import { renderComponent } from "config/testUtils";
import causeFactory from "config/testUtils/factories/causeFactory";
import offerFactory from "config/testUtils/factories/offerFactory";
import { screen } from "@testing-library/react";
import OfferSelectionSection from "./index";

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
      <OfferSelectionSection cause={causeFactory()} onValueChange={mockFn} />,
      { cryptoPaymentProviderValue: { amount: "5" } },
    );
  });

  it("show the amount selected", () => {
    expect(screen.getByRole("textbox", { name: "value-input" })).toHaveValue(
      "5",
    );
  });
});
