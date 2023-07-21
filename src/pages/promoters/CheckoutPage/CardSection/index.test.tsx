import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import { screen } from "@testing-library/react";
import offerFactory from "config/testUtils/factories/offerFactory";
import { clickOn, waitForPromises, renderComponent } from "config/testUtils";
import CardSection from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
    target: "non_profit",
    targetId: "1",
    offer: "0",
  }),
}));

const mockCurrentPayable = nonProfitFactory();
jest.mock("hooks/usePayable", () => ({
  __esModule: true,
  default: () => mockCurrentPayable,
}));

const mockOffer = offerFactory();
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useOffers: () => ({
    offers: [mockOffer],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expectTextToBeInTheDocument("Payment");
  });

  describe("when the form is filled", () => {
    const mockSubmitFn = jest.fn();
    beforeEach(async () => {
      renderComponent(<CardSection />, {
        cardPaymentProviderValue: {
          country: "Brasil",
          city: "Brasilia",
          name: "John Doe",
          taxId: "411.411.411-41",
          state: "DF",
          number: "4111111111111111",
          expirationDate: "05/2025",
          cvv: "411",
          handleSubmit: mockSubmitFn,
        },
      });
      await waitForPromises();
    });

    it("enables the submit button", () => {
      expect(screen.getByText("Confirm payment")).toBeEnabled();
    });

    describe("when the submit button is clicked", () => {
      beforeEach(() => {
        clickOn("Confirm payment");
      });

      it("calls the handle submit function", () => {
        expect(mockSubmitFn).toHaveBeenCalled();
      });

      it("logs the confirmPaymentFormBtn_click", () => {
        expectLogEventToHaveBeenCalledWith("confirmPaymentFormBtn_click", {
          nonProfitId: `${mockCurrentPayable.id}`,
        });
      });
    });
  });
});
