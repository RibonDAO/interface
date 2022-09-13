import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { act, screen } from "@testing-library/react";
import ImpactInformationSection from ".";

const mockNonProfit = nonProfitFactory({
  impactDescription: "1 hour of study",
});
jest.mock("hooks/apiHooks/useNonProfits", () => ({
  __esModule: true,
  default: () => ({
    nonProfits: [mockNonProfit],
  }),
}));

const mockOffer = offerFactory({ price: "$5,00", id: 1 });
const mockOffer2 = offerFactory({ price: "$15,00", id: 2 });

jest.mock("hooks/apiHooks/useOffers", () => ({
  __esModule: true,
  default: () => ({
    offers: [mockOffer, mockOffer2],
    refetch: () => {},
  }),
}));

describe("ImpactInformationSection", () => {
  it("should render without error", () => {
    renderComponent(<ImpactInformationSection />);

    expectTextToBeInTheDocument("Choose your giving");
  });

  it("shows the simulate impact section", () => {
    renderComponent(<ImpactInformationSection />);

    expectTextToBeInTheDocument("1 hour of study");
  });

  describe("when an offer is clicked", () => {
    it("sets the simulation to its price", () => {
      act(() => {
        renderComponent(<ImpactInformationSection />);
      });

      clickOn("$15");
      expectTextToBeInTheDocument("$15,00 can pay up to");
    });
  });

  describe("when the simulate info button is clicked", () => {
    it("shows the simulate info modal", () => {
      renderComponent(<ImpactInformationSection />);
      const simulateInfoButton = screen.getByAltText("question-mark-icon");
      clickOn(simulateInfoButton);

      expectTextToBeInTheDocument("This is a possible result");
    });
  });
});
