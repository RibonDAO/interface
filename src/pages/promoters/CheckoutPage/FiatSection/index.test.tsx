import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import { screen } from "@testing-library/react";
import offerFactory from "config/testUtils/factories/offerFactory";
import { clickOn, waitForPromises, renderComponent } from "config/testUtils";
import FiatSection from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
    target: "non_profit",
    targetId: "1",
    offer: "0",
    paymentMethodIndex: "0",
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

describe("FiatSection", () => {
  it("should render without error", () => {
    renderComponent(<FiatSection />);

    expectTextToBeInTheDocument("Payment");
  });

  describe("when the form is filled", () => {
    const mockSubmitFn = jest.fn();
    beforeEach(async () => {
      renderComponent(<FiatSection />, {
        paymentProviderValue: {
          country: "Brasil",
          city: "Brasilia",
          state: "DF",
          taxId: "12345678901",
          email: "john@doe.com",
        },
        cardPaymentProviderValue: {
          name: "John Doe",
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
          targetId: `${mockCurrentPayable.id}`,
          target: "non_profit",
          paymentMethod: "card",
          amount: 10,
          currency: "usd",
        });
      });
    });
  });
});
