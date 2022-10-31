import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import OfferSelectionSection from ".";

describe("OfferSelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <OfferSelectionSection cause={causeFactory()} onOfferChange={mockFn} />,
    );
  });

  it("Shows available values", () => {
    expectTextToBeInTheDocument("$5,00");
    expectTextToBeInTheDocument("$10,00");
    expectTextToBeInTheDocument("$15,00");
  });
});
